import type { Meta, StoryObj } from '@storybook/react';
import { MenuSimple as Menu } from '../components/menu/Menu';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Example/Menu',
	component: Menu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		list: [
			{ path: 'path1', name: 'name1', icon: null },
			{ path: 'path2', name: 'name2', icon: null },
			{ path: 'path3', name: 'name3', icon: null },
		],
		onClick: (path) => {
			console.log('click path', path);
		},
		name: 'name1',
	},
};
