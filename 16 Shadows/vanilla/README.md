# 16. Shadows

![Screenshot of the brwoser running lesson 16](https://github.com/patternina/threejs-journey/blob/main/screenshots/16-shadows-demo.png)

Three.js uses a Shadow Map to calculate and render the shadows of objects in a scene.

Different algorithms can be applied to shadow maps:

-   `THREE.BasicShadowMap` — Very performant but lousy quality
-   `THREE.PCFShadowMap` — Less performant but smoother edges (default)
-   `THREE.PCFSoftShadowMap` — Less performant but even softer edges
-   `THREE.VSMShadowMap` — Less performant, more constraints, can have unexpected results

To specify an algorihtm, set it with

```js
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

Keep in mind that the radius (blurriness) does not work with `THREE.PCFSoftShadowMap`.

An alternative to shadows would be to create a plane slightly above the plane with an `alphaMap` using a texture.
