import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import { ReactNode } from 'react';

const icons = new Map<string, ReactNode>([
	['users', <GroupIcon sx={{ color: 'text.primary' }} />],
	['questions', <QuestionMarkIcon sx={{ color: 'text.primary' }} />],
	['categories', <CategoryIcon sx={{ color: 'text.primary' }} />],
]);

export function map<T>(arr: T[] | undefined, fn: (item: T, index?: number) => any) {
	if (Array.isArray(arr) && arr.length !== 0) {
		return arr.map((item, index) => fn(item, index));
	}
	return [];
}

type ExtendedEntities = {
	name: string;
	icon: ReactNode;
	path: string;
};
export function extendEntities(entities: string[] | undefined): ExtendedEntities[] {
	return entities
		? entities.map((e) => ({
				name: e,
				icon: icons.get(e),
				path: `?show=${e}`,
		  }))
		: [];
}

export const groupParamsByKey = (params: URLSearchParams) =>
	[...params.entries()].reduce((acc: { [index: string]: any }, tuple) => {
		// getting the key and value from each tuple
		const [key, val] = tuple;
		if (acc.hasOwnProperty(key)) {
			// if the current key is already an array, we'll add the value to it
			if (Array.isArray(acc[key])) {
				acc[key] = [...acc[key], val];
			} else {
				// if it's not an array, but contains a value, we'll convert it into an array
				// and add the current value to it
				acc[key] = [acc[key], val];
			}
		} else {
			// plain assignment if no special case is present
			acc[key] = val;
		}

		return acc;
	}, {});

export function openSidebar() {
	if (typeof document !== 'undefined') {
		document.body.style.overflow = 'hidden';
		document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
	}
}

export function closeSidebar() {
	if (typeof document !== 'undefined') {
		document.documentElement.style.removeProperty('--SideNavigation-slideIn');
		document.body.style.removeProperty('overflow');
	}
}

export function toggleSidebar() {
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--SideNavigation-slideIn');
		if (slideIn) {
			closeSidebar();
		} else {
			openSidebar();
		}
	}
}
// @ts-nocheck
/**
 * Highlight keywords inside a DOM element
 * @param {string} elem Element to search for keywords in
 * @param {string[]} keywords Keywords to highlight
 * @param {boolean} caseSensitive Differenciate between capital and lowercase letters
 * @param {string} cls Class to apply to the highlighted keyword
 */

export function highlight(elem: Node, keywords: string[], caseSensitive: boolean = false, cls: string = 'highlight') {
	const flags = caseSensitive ? 'gi' : 'g';
	// Sort longer matches first to avoid
	// highlighting keywords within keywords.
	keywords.sort((a, b) => b.length - a.length);
	Array.from(elem.childNodes).forEach((child) => {
		const keywordRegex = RegExp(keywords.join('|'), flags);
		if (child.nodeType !== 3) {
			// not a text node
			highlight(child, keywords, caseSensitive, cls);
			// @ts-ignore
		} else if (keywordRegex.test(child.textContent)) {
			const frag = document.createDocumentFragment();
			let lastIdx = 0;
			// @ts-ignore
			child.textContent.replace(keywordRegex, (match, idx) => {
				// @ts-ignore
				const part = document.createTextNode(child.textContent.slice(lastIdx, idx));
				const highlighted = document.createElement('span');
				highlighted.textContent = match;
				highlighted.classList.add(cls);
				frag.appendChild(part);
				frag.appendChild(highlighted);
				lastIdx = idx + match.length;
			});
			// @ts-ignore
			const end = document.createTextNode(child.textContent.slice(lastIdx));
			frag.appendChild(end);
			// @ts-ignore
			child.parentNode.replaceChild(frag, child);
		}
	});
}
