import "@fastcampus/react-components-layout/style.css";
import { Box as _Box } from "@fastcampus/react-components-layout";

export default {
  title: "React Components/Layout/Box",
  component: _Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const BlockStory = {
  args: {
    as: "button",
    padding: 5,
    background: "pink",
    boxShadow: "xl",
    borderRadius: "full",
  },
};
