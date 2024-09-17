import type { Meta, StoryObj } from '@storybook/svelte';
import SearchNormal from './SearchNormal.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  component: SearchNormal,
  tags: ['autodocs'],
} satisfies Meta<SearchNormal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {},
};
