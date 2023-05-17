# 15. Lights

All lights are subclasses of the [Light](https://threejs.org/docs/index.html?q=light#api/en/lights/Light) class, which is an abstract base class for lights - all other light types inherit its properties and methods.

## [`AmbientLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight)

This light globally illuminates all objects in the scene equally. This light cannot be used to cast shadows as it does not have a direction.

```js
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)
```

## [`DirectionalLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight)

A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel.

This light can cast shadows.

Code Example

```js
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(directionalLight)
```

## [`HemisphereLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight)

A light source positioned directly above the scene, with color fading from the sky color to the ground color.

This light cannot be used to cast shadows.

Code Example

```js
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
scene.add(light)
```

## [`PointLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight)

A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

This light can cast shadows.

Code Example

```js
const light = new THREE.PointLight(0xff0000, 1, 100)
light.position.set(50, 50, 50)
scene.add(light)
```

## [`RectAreaLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight)

`RectAreaLight` emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting.

Important Notes:

- There is no shadow support.
- Only `MeshStandardMaterial` and `MeshPhysicalMaterial` are supported.
- You have to include `RectAreaLightUniformsLib` into your scene and call `init()`.

Code Example

```js
const width = 10
const height = 10
const intensity = 1
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height)

rectLight.position.set(5, 5, 0)
rectLight.lookAt(0, 0, 0)

scene.add(rectLight)

const rectLightHelper = new RectAreaLightHelper(rectLight)
rectLight.add(rectLightHelper)
```

## [`SpotLight`](https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight)

This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.

This light can cast shadows.

Code Example

```js
// white spotlight shining from the side, modulated by a texture, casting a shadow

const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(100, 1000, 100)
spotLight.map = new THREE.TextureLoader().load(url)

spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

spotLight.shadow.camera.near = 500
spotLight.shadow.camera.far = 4000
spotLight.shadow.camera.fov = 30

scene.add(spotLight)
```

## Performance

Lights might be expensive. Use them with caution.

- Low-cost lights: `AmbientLight` and `HemisphereLight`.
- Moderate-cost lights: `DirectionalLight` and `PointLight`.
- High-cost lights: `SpotLight` and `RectAreaLight`.

## Light Helpers

Light helpers are helper objects to assist with visualizing a light's effect on the scene.

### [`DirectionalLightHelper`](https://threejs.org/docs/index.html?q=lighthelper#api/en/helpers/DirectionalLightHelper)

Helper object to assist with visualizing a `DirectionalLight`'s effect on the scene. This consists of plane and a line representing the light's position and direction.

Code Example

```js
const light = new THREE.DirectionalLight(0xffffff)
const helper = new THREE.DirectionalLightHelper(light, 5)
scene.add(helper)
```

### [`HemisphereLightHelper`](https://threejs.org/docs/index.html?q=lighthelper#api/en/helpers/HemisphereLightHelper)

Creates a visual aid consisting of a spherical `Mesh` for a `HemisphereLight`.

Code Example

```js
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
const helper = new THREE.HemisphereLightHelper(light, 5)
scene.add(helper)
```

### [`PointLightHelper`](https://threejs.org/docs/index.html?q=lighthelper#api/en/helpers/PointLightHelper)

This displays a helper object consisting of a spherical `Mesh` for visualizing a `PointLight`.

Code Example

```js
const pointLight = new THREE.PointLight(0xff0000, 1, 100)
pointLight.position.set(10, 10, 10)
scene.add(pointLight)

const sphereSize = 1
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
scene.add(pointLightHelper)
```

### [`SpotLightHelper`](https://threejs.org/docs/index.html?q=lighthelper#api/en/helpers/SpotLightHelper)

This displays a cone shaped helper object for a `SpotLight`.

Code Example

```js
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(10, 10, 10)
scene.add(spotLight)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
```

### [`RectAreaLightHelper`](https://threejs.org/docs/index.html?q=lighthelper#examples/en/helpers/RectAreaLightHelper)

Creates a visual aid for a `RectAreaLight`.

#### Import

`RectAreaLightHelper` is an add-on, and must be imported explicitly.

```js
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'
```

Code Example

```js
const light = new THREE.RectAreaLight(0xffffbb, 1.0, 5, 5)
const helper = new RectAreaLightHelper(light)
light.add(helper) // helper must be added as a child of the light
```
