const VIEWPORT_MARGIN_PX = 5;

export function getViewport() {
  const visualViewport = window.visualViewport;

  if (!visualViewport) {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return {
    left: visualViewport.offsetLeft,
    top: visualViewport.offsetTop,
    width: visualViewport.width,
    height: visualViewport.height,
  };
}

export function clampToViewport(
  x: number,
  y: number,
  agentWidth: number,
  agentHeight: number,
) {
  const viewport = getViewport();

  return {
    x: Math.max(
      viewport.left + VIEWPORT_MARGIN_PX,
      Math.min(
        x,
        viewport.left + viewport.width - agentWidth - VIEWPORT_MARGIN_PX,
      ),
    ),
    y: Math.max(
      viewport.top + VIEWPORT_MARGIN_PX,
      Math.min(
        y,
        viewport.top + viewport.height - agentHeight - VIEWPORT_MARGIN_PX,
      ),
    ),
  };
}
