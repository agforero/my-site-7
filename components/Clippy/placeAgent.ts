import type { ClippyAgent } from "./speak";
import { clampToViewport, getViewport } from "./viewport";

const SPAWN_FROM_RIGHT_RATIO = 0.4;
const MAX_PLACE_ATTEMPTS = 60;

function isAgentReady(clippy: NonNullable<ClippyAgent>) {
  return (
    clippy._el.isConnected &&
    getComputedStyle(clippy._el).display !== "none" &&
    clippy._el.offsetWidth > 0
  );
}

function setAgentPosition(clippy: NonNullable<ClippyAgent>) {
  const viewport = getViewport();
  const left =
    viewport.left + viewport.width * (1 - SPAWN_FROM_RIGHT_RATIO);
  const currentTop = Number.parseFloat(clippy._el.style.top);
  const top = Number.isNaN(currentTop)
    ? viewport.top + viewport.height * 0.8
    : currentTop;
  const clamped = clampToViewport(
    left,
    top,
    clippy._el.offsetWidth,
    clippy._el.offsetHeight,
  );

  clippy._el.style.left = `${clamped.x}px`;
  clippy._el.style.top = `${clamped.y}px`;
  clippy._balloon.reposition();
}

export function placeAgentFromRight(clippy: ClippyAgent) {
  if (!clippy) {
    return;
  }

  const tryPlace = (attempt: number) => {
    if (!clippy._el.isConnected) {
      return;
    }

    if (!isAgentReady(clippy) && attempt < MAX_PLACE_ATTEMPTS) {
      requestAnimationFrame(() => tryPlace(attempt + 1));
      return;
    }

    setAgentPosition(clippy);
  };

  tryPlace(0);
}
