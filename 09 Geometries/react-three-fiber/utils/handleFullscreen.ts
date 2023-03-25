export const handleFullscreen = (element: HTMLCanvasElement) => {
  const fullscreenElement =
    document.fullscreenElement || (document as any).webkitFullscreenElement

  if (fullscreenElement === null) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if ((element as any).webkitRequestFullscreen) {
      ;(element as any).webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      ;(document as any).webkitExitFullscreen()
    }
  }
}
