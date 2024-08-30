import { Meta, StoryObj } from '@storybook/react';
import Timer from '@components/ui/timer/Timer.tsx';

const meta = {
  title: 'Room/Timer',
  component: Timer,
  parameter: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {};
