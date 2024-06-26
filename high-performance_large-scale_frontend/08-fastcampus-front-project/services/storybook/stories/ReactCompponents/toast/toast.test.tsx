import React from "react";

import { describe, expect, it, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "../../../test/test-utils";

import { composeStories } from "@storybook/react";
import * as stories from "./toast.stories";

const { ToastStory } = composeStories(stories);

describe("Toast 컴포넌트 테스트", () => {
  it("toast 클릭시 toast가 잘 뜨는지 확인", async () => {
    // GIVEN
    render(<ToastStory />);

    // WHEN
    const button = screen.getByRole("button");
    userEvent.click(button);

    // THEN
    await waitFor(() => {
      expect(screen.getByText("tastats")).toBeInTheDocument();
    });
  });

  it("toast가 3초 후에 사라지는지 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ToastStory />);

    // WHEN
    const button = screen.getByRole("button");
    userEvent.click(button);

    const toastContainer = container.querySelector("#toast-container");

    // THEN
    await vi.advanceTimersByTimeAsync(3001);
    expect(toastContainer?.hasChildNodes()).toBeFalsy();
  });
});
