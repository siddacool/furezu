import type { Meta, StoryObj } from '@storybook/svelte';
import ButtonGroup from './ButtonGroup.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {},
};
