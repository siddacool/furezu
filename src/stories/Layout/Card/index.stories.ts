import type { Meta, StoryObj } from '@storybook/svelte';
import Card from './Card.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {},
};
