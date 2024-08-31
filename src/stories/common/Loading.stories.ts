import Button from '@components/common/button/Button.tsx';
import type { Meta, StoryObj } from '@storybook/react';
import Loading from "@pages/Loading.tsx";

const meta = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argsTypes: {
    disabled: { control: 'boolean' }
  }
} as Meta<typeof Loading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
