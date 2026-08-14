"use client";

import { useEffect, useRef } from "react";
import { useClippy } from "@react95/clippy";
import { enableAgentDrag } from "../enableDrag";
import { placeAgentFromRight } from "../placeAgent";
import { queueClippySpeech } from "../speak";

export default function ClippyGreeting() {
  const { clippy } = useClippy();
  const hasGreeted = useRef(false);

  useEffect(() => {
    if (!clippy) {
      return;
    }

    enableAgentDrag(clippy);
    placeAgentFromRight(clippy);

    if (hasGreeted.current) {
      return;
    }

    hasGreeted.current = true;
    queueClippySpeech(clippy, "Click an item for me to explain!");
  }, [clippy]);

  useEffect(() => {
    if (!clippy) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (clippy._balloon._active) {
        return;
      }

      // Held speech never completes the queue, so clear it first or
      // animate() would sit forever behind the open balloon.
      clippy._queue.clear();
      clippy._queue._active = false;
      clippy.animate();
    }, 15_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [clippy]);

  return null;
}
