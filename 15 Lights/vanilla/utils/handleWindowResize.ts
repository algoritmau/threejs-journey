export const handleWindowResize = (canvas: HTMLCanvasElement) => {
  window.addEventListener('dblclick', () => {
    // Casting to <any> before accessing props and methods that might not exist on document
    const fullscreenElement =
      document.fullscreenElement || (<any>document).webkitFullscreenElement

    if (fullscreenElement === null) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
      } else if ((<any>canvas).webkitRequestFullscreen) {
        ;(<any>canvas).webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((<any>document).webkitExitFullscreen) {
        ;(<any>document).webkitExitFullscreen()
      }
    }
  })
}
