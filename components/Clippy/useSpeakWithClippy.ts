"use client";

import { useClippy } from "@react95/clippy";
import { speakImmediately } from "./speak";

export function useSpeakWithClippy() {
  const { clippy } = useClippy();

  return {
    speak: (text: string) => speakImmediately(clippy, text),
  };
}
