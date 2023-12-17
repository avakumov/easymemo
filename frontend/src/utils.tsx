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
