import type { Meta, StoryObj } from '@storybook/svelte';
import DefaultButton from './Buttons.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  component: DefaultButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<DefaultButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Buttons: Story = {
  args: {},
};
