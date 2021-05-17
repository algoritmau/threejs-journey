# 11 - Textures

Textures are images that will cover the surface of geometries. There are many types fof textures.

- **Color (or Albedo)** — It's the simplest one. It's applied on the geometry.

- **Alpha** — Grayscale image with white part visible and black part not visible.

- **Height (or Displacement)** — Grayscale image. Move the vertices to create some relief. Requires enough subdivision.
- Normal — Provide details. Does not require subdivision. The vertices won't move. Lure the light on the face orientation. Better perf that adding a height texture with lots of subdivisions.

- **Ambient Occlusion** — Grayscale image. Add fake shadows to crevices. Physically inaccurate. Helps to create contrast and see details.

- **Metalness** — Grayscale image. Mostly used for reflection. When white, it conveys metallic. When black, it conveys non-metallic.

- **Roughness** — Grayscale image. Usually used with metalness. When white, it's rough. When black, it's smooth. Used for light dissipation.

<br>
<br>

---

<br>
<br>

Textures (especially the metalness and the roughness) follow **PBR** principles — Physically Based Rendering, techniques that tend to follow real-life directions to achieve realistic results.

<br>
<br>

## How to load textures

First, we need to get the image's path. Add the image to the `static` folder and import it like so:

```js
const colorTextureImageSourcePath = '/textures/door/color.jpg'

const colorTextureImage = new Image()
const colorTexture = new THREE.Texture(colorTextureImage)

colorTextureImage.addEventListener('load', () => {
  colorTexture.needsUpdate = true
})

colorTextureImage.src = colorTextureImageSourcePath

...
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
...
```

<br>
<br>

## Using `TextureLoader`

One single instance of `TextureLoader` can load multiple textures. We can pass three functions after the texture's image path: load, progress, error.

```js
const colorTextureLoader = new THREE.TextureLoader()
const colorTexture = colorTextureLoader.load(colorTextureImageSourcePath)
```
