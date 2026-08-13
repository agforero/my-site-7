import type { useClippy } from "@react95/clippy";

type ClippyAgent = ReturnType<typeof useClippy>["clippy"];

const preparedBalloons = new WeakSet<object>();
const HEIGHT_BUFFER_PX = 4;
const WIDTH_BUFFER_PX = 4;

export function prepareClippyBalloon(clippy: ClippyAgent) {
  if (!clippy) {
    return;
  }

  const balloon = clippy._balloon;
  if (preparedBalloons.has(balloon)) {
    return;
  }
  preparedBalloons.add(balloon);

  const balloonEl = balloon._balloon;
  const content = balloon._content;

  balloonEl.style.boxSizing = "content-box";
  content.style.boxSizing = "content-box";
  content.style.lineHeight = "1.25";

  const originalSpeak = balloon.speak.bind(balloon);
  balloon.speak = (complete, text, hold) => {
    balloonEl.style.display = "block";
    content.style.height = "auto";
    content.style.width = "auto";
    content.textContent = text;

    const width = content.offsetWidth + WIDTH_BUFFER_PX;
    content.style.width = `${width}px`;
    const height = content.offsetHeight + HEIGHT_BUFFER_PX;
    content.textContent = "";

    originalSpeak(complete, text, hold);

    content.style.width = `${width}px`;
    content.style.height = `${height}px`;
    balloon.reposition();
  };
}
