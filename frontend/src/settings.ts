const settings = {
	practice: {
		DEFAULT_TASK_COUNT: 10,
		MAX_TASK_COUNT: 100,
		MIN_TASK_COUNT: 1,
	},
	lists: {
		PER_PAGE: 100,
	},

	apiUrl: import.meta.env.PROD ? 'https://easymemo.avakumov.ru/api' : 'http://localhost:8001/api',
};

export default settings;
