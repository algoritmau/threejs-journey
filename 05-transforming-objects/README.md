# 04 Transforming Objects

In this lesson, we are going to learn how to transform objects.

We need to learn how to transform objects since we'll be animating objects in upcoming lessons and we'll need to move the objects before animating them.

There are four properties to transform objects: `position`, `scale`, `rotation`, and `quaternion`. All these properties will be compiled to matrices.

All classes that inherit from the `Object3D` possess those properties. For instance, `PerspectiveCamera` or `Mesh`.

## Moving objects

Rotation goes on the x, y, and z order specifically

Note: Gimbal lock

Reorder object.rotation.reorder('YXZ') - Must be done prior rotating

Quaternion - represents rotation in a more mathematical way. It gets updated when changing the rotation.

Object3D instances have a lookAt(... method which rotates the object so that its z axis faces the target provided) - target must be a Vector3

Scene Graph - Groups
