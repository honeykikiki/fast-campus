import React from "react";
import "@fastcampus/react-components-button/style.css";
import "@fastcampus/react-components-toast/style.css";
import { Button } from "@fastcampus/react-components-button";

import { ToastProvider, useToast } from "@fastcampus/react-components-toast";

export default {
  title: "React Components/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Example = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          payload: {
            message: "tastats",
          },
          duration: 10000,
        });
      }}
    >
      Toast Button
    </Button>
  );
};

export const ToastStory = {
  render: () => (
    <ToastProvider>
      <Example />
    </ToastProvider>
  ),
};
