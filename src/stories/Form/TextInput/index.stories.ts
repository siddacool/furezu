import type { Meta, StoryObj } from '@storybook/svelte';
import TextInputNormal from './TextInputNormal.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  component: TextInputNormal,
  tags: ['autodocs'],
} satisfies Meta<TextInputNormal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {},
};
