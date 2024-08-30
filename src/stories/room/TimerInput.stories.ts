import { Meta, StoryObj } from '@storybook/react';
import TimerInput from '@components/ui/timer/TimeInput.tsx';

const meta = {
  title: 'Room/TimerInput',
  component: TimerInput,
  parameter: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta<typeof TimerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {};
