// HTML Element where result will be rendered to
const canvas = document.getElementById('webgl')
const sizes = {
  width: 800,
  height: 600,
}

// Creating a scene
const scene = new THREE.Scene()

// Creating a camera
/**
 * Creates a PerspectiveCamera.
 * @param {number} FOV - The field of view: the extent of the scene that is seen on the display at any given moment. The value is in degrees.
 * @param {number} aspectRatio - The size of the view: sizes.width / sizes.height.
 * @param {number} near - The near clipping plane.
 * @param {number} far - The far clipping plane.
 */
// function THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far) {}

const camera = new THREE.PerspectiveCamera(
  64,
  sizes.width / sizes.height,
  0.1,
  1000,
)

// Creating the renderer
/*
  Renderer - Renders the scene from the camera's pov
  Threejs draws the result in a canvas via WebGL
*/
const renderer = new THREE.WebGLRenderer({
  canvas,
})

// Settting the renderer's size
renderer.setSize(sizes.width, sizes.height)

// Creating the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Creating the material
// const material = new THREE.MeshBasicMaterial({ color: 0x66ff22 })
// Changin material type so that light gets reflected on the box
const material = new THREE.MeshPhongMaterial({ color: 0x66ff22 })

// Create the cube with the geometry and the material
const cube = new THREE.Mesh(geometry, material)

// Add the cube to the scene
scene.add(cube)

// Adding a light for better 3D perception
{
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.72)
  directionalLight.position.set(-1, 2, 4)
  scene.add(directionalLight)
}

// Move the camera backwards prior rendering
camera.position.z = 3

// Rendering the scene
const animate = () => {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
