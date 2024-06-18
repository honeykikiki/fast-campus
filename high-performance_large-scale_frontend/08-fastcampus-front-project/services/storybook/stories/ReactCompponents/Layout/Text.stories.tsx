import "@fastcampus/react-components-layout/style.css";
import { Text as _Text } from "@fastcampus/react-components-layout";
import { classes, vars } from "@fastcampus/themes";

export default {
  title: "React Components/Layout/Text",
  component: _Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fontSize: {
      options: Object.keys(classes.typography.text),
      control: "select",
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: "select",
    },
  },
};

export const BlockStory = {
  args: {
    as: "p",
    fontSize: "xl",
    children: "hello word",
  },
};
