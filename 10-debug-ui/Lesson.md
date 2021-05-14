# 10. Debug UI

There are several tools we can use to debug Three.js applications:

- dat.GUI
- control.panel
- ControlKit
- Guify
- Oui

We'll be using `dat.GUi`:

```bash
npm i --save-dev dat.gui
```

There are various types of elements we can add to the panel:

- **Range** — for values with min/max
- **Color**
- **Text**
- **Checkbox** — for booleans
- **Select** — to select from a list of values
- **Button** — to trigger functions
- **Folder** — for organizing panels containing many elements

```js
// Debug
// gui.add(cube.position, 'y', -3, 3, 0.01)
gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name('Elevation')
gui.add(cube, 'visible')
```

We can change an element's color

```js
const gui = new dat.GUI()
// Debug object
const parameters = {
  color: 0x321dd4,
  spin() {
    gsap.to(cube.rotation, { y: cube.rotation.y + 4, duration: 2 })
  }
}

gui
  .addColor(parameters, 'color')
  .onChange(() => material.color.set(parameters.color))

gui.add(parameters, 'spin')
```
