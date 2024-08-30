import Button from "@components/common/button/Button.tsx";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
    title: "Buttons/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
    argsTypes: {
        disabled: {control: "boolean"}
    }
} as Meta<typeof Button>
export default meta;
type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
    }
};

export const RedButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
        buttonColor: 'red'
    }
};

export const GreenButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
        buttonColor: 'green'
    }
};

export const YellowButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
        buttonColor: 'yellow'
    }
};

export const PurpleButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
        buttonColor: 'purple'
    }
};

export const PinkButton: Story = {
    args: {
        children: 'ComonButton',
        disabled: false,
        buttonColor: 'pink'
    }
};