# 07 - Cameras

`Camera` it's an abstract base class for cameras. This class should always be inherited when you build a new camera. It's not supposed to be directly manipulated.

## Types of Cameras

- `ArrayCamera`: can be used in order to efficiently render a scene with a predefined set of cameras. This is an important performance aspect for rendering VR scenes. An instance of `ArrayCamera` always has an array of sub cameras. It's mandatory to define for each sub camera the viewport property which determines the part of the viewport that is rendered with this camera.

- `CubeCamera`: Creates 6 cameras that render to a `WebGLCubeRenderTarget`. Can render the surroundings for things like environments map, reflection or shadow map.

- `OrtographicCamera`: Camera that uses orthographic projection. In this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera. This can be useful for rendering 2D scenes and UI elements, amongst other things.

- `PerspectiveCamera`: Camera that uses perspective projection. This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.

- `StereoCamera`: Dual `PerspectiveCameras` used for effects such as 3D Anaglyph or Parallax Barrier.

## `PerspectiveCamera`

Constructor
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
`fov` — Camera frustum vertical field of view.
`aspect` — Camera frustum aspect ratio.
`near` — Camera frustum near plane.
`far` — Camera frustum far plane.

```js
/**
 * Creates a PerspectiveCamera.
 * @param {number} fov - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} aspect - The size of the view: sizes.width / sizes.height.
 * @param {number} near - The near clipping plane.
 * @param {number} far - The far clipping plane.
 */
// function THREE.PerspectiveCamera(fov, aspect, near, far) {}
const camera = new THREE.PerspectiveCamera(
  64,
  viewportSizes.width / viewportSizes.height,
  0.1,
  1000,
)
```

Together these define the camera's viewing frustum.
