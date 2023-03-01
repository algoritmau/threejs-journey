# 03 Basic Scene

The goal of this section is to provide a short introduction to three.js. We will start by setting up a scene, with a spinning cube.

Before using three.js, we need a _place_ to display it, somewhere in the DOM. We'll be using an HTML `<canvas>` element to display our work with three.js. Such element has been placed in our HTML document ([index.html](index.html)). We will also import a minified version of the three.js library via the [three.min.js](three.min.js) file and add it to HTML via a `<script>` tag. Finally, our three.js code will be written in the [script.js](script.js) file, which is also add it to HTML via a `<script>` tag.

<br>
<br>

## Creating a Scene

To have anything displayed with three.js, we need three parts: a **scene**, a **camera**, and a **renderer**, so we get to render the scene with a camera.

<br>

```js
// Creating the scene
const scene = new THREE.Scene()

// Creating the camera
const camera = new THREE.PerspectiveCamera(
  64,
  sizes.width / sizes.height,
  0.1,
  1000,
)

// Creating a renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})

// Setting the renderer's width and height
renderer.setSize(sizes.width, sizes.height)
```

<br>

There are different cameras in three.js. For now, we're going to use a [`PerspectiveCamera`](https://threejs.org/docs/api/en/cameras/PerspectiveCamera.html), which is a camera that uses [perspective projection](<https://en.wikipedia.org/wiki/Perspective_(graphical)>). This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.

The first attribute is the **field of view**. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.

The second one is the **aspect ratio**. You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV—the image looks squished.

The next two attributes are the **near** and **far** clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered. You don't have to worry about this now, but you may want to use other values in your apps to get better performance.

Note that when creating the camera, we used a previously declared `sizes` object that holds the corresponding sizes.

<br>

```js
const sizes = {
  width: 800,
  height: 600,
}
```

<br>

Next up is the **renderer**. This is where the magic happens. In addition to the `WebGLRenderer` we use here—which displays our crafted scenes using WebGL—three.js comes with a few others, often used as fallbacks for users with older browsers or for those who don't have WebGL support for some reason.

Here, we passed another previously defined variable, `canvas`, which represents the HTML element where our scene will be displayed. We passed this element to the renderer as a property of an object argument. This object is optional and, in the event of not passing it, the renderer will create a `<canvas>` element for us. In that case, we will need to add the renderer to the HTML document manually (We could use something like `document.body.appendChild( renderer.domElement )`).

<br>

```js
const canvas = document.getElementById('webgl')
```

<br>

In addition to creating the `renderer` instance, we also need to set the _size_ at which we want it to render our app. It's a good idea to use the width and height of the area we want to fill with our app—in this case, the width and height indicated on the `sizes` object. For performance intensive apps, you can also give `setSize` smaller values, like `sizes.width/2` and `sizes.height/2`, which will make the app render at half size.

If you wish to keep the size of your app but render it at a lower resolution, you can do so by passing a third argument to `setSize` (`updateStyle`) with a value of `false`. For example, `setSize(sizes.width/2, sizes.height/2, false)` will render your app at half resolution, given that your `<canvas>` has 100% width and height.

<br>
<br>

## Creating a cube

<br>

```js
// Creating the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Creating the material
const material = new THREE.MeshBasicMaterial({ color: 0x66ff22 })

// Create the cube with the geometry and the material
const cube = new THREE.Mesh(geometry, material)

// Add the cube to the scene
scene.add(cube)

// Move the camera backwards prior rendering
camera.position.z = 3
```

<br>

To create a cube, we need a [`BoxGeometry`](https://threejs.org/docs/api/en/geometries/BoxGeometry.html), a geometry class for a rectangular cuboid with a given `width`, `height`, and `depth`. This is an object that holds all the points (vertices) and fills (faces) of the cube.

In addition to the geometry, we need a **material** to color it. Three.js comes with several materials, but we'll stick to the `MeshBasicMaterial` for now. All materials take an object of properties which will be applied to them. To keep things very simple, we only supply a color attribute of 0x66ff22, which is green. This works the same way that colors work in CSS or Photoshop (hex colors).

The third thing we need is a Mesh. A **mesh** is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.

By default, when we call `scene.add()`, whatever we add will be placed to the coordinates `(0, 0, 0)`. This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bit.

<br>
<br>

## Rendering the scene

We will call the renderer's `render()` method inside of the `animate` function so we get a more interesting result. This method will render our `scene` and `camera` into the canvas.

Notice that, for the `animate` function, we're using `requestAnimationFrame` over `setInterval`. The former has the advantage of pausing the animation when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.

We're also animating the cube. This will be run every frame (normally 60 times per second), and give the cube a nice rotation animation.

<br>
<br>

## Further Reading

- [Three.js Documentation for creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

- [BoxGeometry - three.js docs](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)

- [PerspectiveCamera - three.js docs](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)

- [Viewing Frustum](https://en.wikipedia.org/wiki/Viewing_frustum)

- [WebGLRenderer - three.js docs](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
