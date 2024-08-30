import IconButton from '@components/common/button/IconButton.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argsTypes: {
    disabled: { control: 'boolean' }
  }
} as Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false
  }
};

export const RedButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false,
    buttonColor: 'red'
  }
};

export const GreenButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false,
    buttonColor: 'green'
  }
};

export const YellowButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false,
    buttonColor: 'yellow'
  }
};

export const PurpleButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false,
    buttonColor: 'purple'
  }
};

export const PinkButton: Story = {
  args: {
    url: '/icons/arrow-down.svg',
    disabled: false,
    buttonColor: 'pink'
  }
};
