import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect from '../components/MultiSelect/MultiSelect';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Example/MultiSelect',
	component: MultiSelect,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		items: ['item2', 'item3', 'item5'],
		selectedItems: ['item2'],
		onSelect: (name: string) => {
			console.log('select: ', name);
		},
		selectAll: () => {
			console.log('select all');
		},
		unSelectAll: () => {
			console.log('unselect all');
		},
		name: 'selector',
	},
};
