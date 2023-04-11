/**
 * Checks if the renderer's canvas is not already the size it is being
 * displayed as and, if so, sets its size.
 * {@param} renderer
 * {@returns} Boolean - true if the canvas was resized; false otherwise.
 */
export const shouldResize = (renderer: THREE.WebGLRenderer): Boolean => {
  const pixelRatio = window.devicePixelRatio
  const canvas = renderer.domElement
  const canvasWidth = (canvas.clientWidth * pixelRatio) | 0
  const canvasHeight = (canvas.clientHeight * pixelRatio) | 0
  const shouldRenderResize =
    canvas.width !== canvasWidth || canvas.height !== canvasHeight

  if (shouldRenderResize) {
    renderer.setSize(canvasWidth, canvasHeight, false)
  }

  return shouldRenderResize
}
