import type { useClippy } from "@react95/clippy";
import { prepareClippyBalloon } from "./prepareBalloon";

const CLIPPY_WORD_SPEAK_MS = 60;

export type ClippyAgent = ReturnType<typeof useClippy>["clippy"];

export function speakImmediately(clippy: ClippyAgent, text: string) {
  if (!clippy) {
    return;
  }

  prepareClippyBalloon(clippy);
  clippy._queue.clear();
  clippy._queue._active = false;
  clippy._balloon.pause();
  clippy._balloon._active = false;
  clippy._balloon.WORD_SPEAK_TIME = CLIPPY_WORD_SPEAK_MS;
  clippy.speak(text, true);
}

export function queueClippySpeech(clippy: ClippyAgent, text: string) {
  if (!clippy) {
    return;
  }

  prepareClippyBalloon(clippy);
  clippy._balloon.WORD_SPEAK_TIME = CLIPPY_WORD_SPEAK_MS;
  clippy.speak(text, true);
}
