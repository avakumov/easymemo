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

export function highlight(selector: string, highlightText: string) {
	const main = document.querySelector(selector);
	const str = highlightText.toLowerCase();

	// Find all text nodes in the main element.
	//@ts-ignore
	const treeWalker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);

	const allTextNodes = [];
	let currentNode = treeWalker.nextNode();
	while (currentNode) {
		allTextNodes.push(currentNode);
		currentNode = treeWalker.nextNode();
	}
	//@ts-ignore
	CSS.highlights.clear();

	if (!str) {
		return;
	}

	const ranges = allTextNodes
		.map((el) => {
			//@ts-ignore
			return { el, text: el.textContent.toLowerCase() };
		})
		.filter(({ text }) => text.includes(str))
		.map(({ text, el }) => {
			// Find all instances of str in el.textContent
			const indices = [];
			let startPos = 0;
			while (startPos < text.length) {
				const index = text.indexOf(str, startPos);
				if (index === -1) break;
				indices.push(index);
				startPos = index + str.length;
			}

			return indices.map((index) => {
				const range = new Range();
				range.setStart(el, index);
				range.setEnd(el, index + str.length);
				return range;
			});
		});

	//@ts-ignore
	const highlight = new Highlight(...ranges.flat());
	//@ts-ignore
	CSS.highlights.set('search-result-highlight', highlight);
}

export function isURL(url: string | undefined): boolean {
	if (!url) {
		return false;
	}
	return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
		url
	);
}
