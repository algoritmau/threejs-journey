# 12 - Materials

Materials are used to put colors on each visible pixel of the geometries.

Once instantiated, the `color` property becomes an instance of the `Color` class.

## `MeshDepthMaterial`

The `MeshDepthMaterial` will simply color the geometry depending of how far/close it is to the camera. White, if close to `near` and black if close to `far`.

> The following materials require a light.

## `MeshLambertMaterial`
