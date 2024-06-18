import "@fastcampus/react-components-layout/style.css";
import { Heading as _Heading } from "@fastcampus/react-components-layout";
import { classes, vars } from "@fastcampus/themes";

export default {
  title: "React Components/Layout/Heading",
  component: _Heading,
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
    children: "hello word<Heading>",
  },
};
