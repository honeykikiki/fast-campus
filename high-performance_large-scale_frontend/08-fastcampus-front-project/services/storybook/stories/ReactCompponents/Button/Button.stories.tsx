import "@fastcampus/react-components-button/style.css";
import { Button as _Button } from "@fastcampus/react-components-button";
import { vars } from "@fastcampus/themes";
import { Text } from "@fastcampus/react-components-layout";
import { useButton } from "@fastcampus/react-hooks-button";
import React from "react";

export default {
  title: "React Components/Button",
  component: _Button,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: "select",
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: "select",
    },
    variant: {
      options: ["solid", "outline", "ghost"],
      control: "select",
    },
  },
};

export const ButtonStory = {
  args: {
    size: "lg",
    children: "Button",
    variant: "outline",
    isDisabled: false,
    isLoading: false,
    leftIcon: "😀",
  },
};

export const TextButtonStory = {
  render: () => {
    const { buttonProps } = useButton({
      elementType: "div",
      onClick: () => {
        console.log("sss");
      },
    });

    return (
      <Text
        {...buttonProps}
        as="div"
        fontSize="md"
        color="green"
        style={{
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        텍스트를 입력 바랍니다.
      </Text>
    );
  },
};
