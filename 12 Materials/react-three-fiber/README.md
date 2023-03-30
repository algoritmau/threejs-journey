# 10 Debug UI

I'm using [dat.gui](https://npmjs.com/package/dat.gui) to create a debug UI. It's a great tool for quickly creating a UI for tweaking variables.

I used `useEffect` to handle the creation of the GUI instance. I also used `useRef` to store the GUI instance so I can access it later.
