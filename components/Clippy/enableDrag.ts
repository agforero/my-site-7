import type { ClippyAgent } from "./speak";
import { clampToViewport } from "./viewport";

const dragEnabledAgents = new WeakSet<object>();

export function enableAgentDrag(clippy: ClippyAgent) {
  if (!clippy || dragEnabledAgents.has(clippy)) {
    return;
  }

  dragEnabledAgents.add(clippy);
  clippy._el.style.touchAction = "none";
  clippy._el.removeEventListener("mousedown", clippy._mouseDownHandle);

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    clippy._el.setPointerCapture(event.pointerId);
    clippy.pause();
    clippy._balloon.hide(true);

    const rect = clippy._el.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const clamped = clampToViewport(
        moveEvent.clientX - offsetX,
        moveEvent.clientY - offsetY,
        clippy._el.offsetWidth,
        clippy._el.offsetHeight,
      );
      clippy._el.style.left = `${clamped.x}px`;
      clippy._el.style.top = `${clamped.y}px`;
    };

    const onPointerUp = () => {
      clippy._el.removeEventListener("pointermove", onPointerMove);
      clippy._el.removeEventListener("pointerup", onPointerUp);
      clippy._el.removeEventListener("pointercancel", onPointerUp);
      clippy._balloon.show();
      clippy._balloon.reposition();
      clippy.resume();
    };

    clippy._el.addEventListener("pointermove", onPointerMove);
    clippy._el.addEventListener("pointerup", onPointerUp);
    clippy._el.addEventListener("pointercancel", onPointerUp);
  };

  clippy._el.addEventListener("pointerdown", onPointerDown);
}
