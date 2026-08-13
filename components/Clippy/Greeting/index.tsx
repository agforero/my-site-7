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

  return null;
}
