export function map<T>(arr: T[] | undefined, fn: (item: T, index?: number) => any) {
	if (Array.isArray(arr) && arr.length !== 0) {
		return arr.map((item, index) => fn(item, index));
	}
	return [];
}
