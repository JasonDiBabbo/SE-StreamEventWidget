# Stream Event Feed

## Full disclosure
The design and functionality of this widget is my reverse engineering of a streaming overlay used by [Sam Woodhall](https://twitter.com/SamCWoodhall). I fell in love with the aesthetic appeal of the widget that Sam Woodhall commissioned from the exceptionally talented [Mikey Hay/TheFyreWire](https://twitter.com/MikeyHay) and decided that I wanted to do my best to replicate it. Additionally, a lot of the code used here is derived from the "Alpha Rotating Feed V2.2" StreamElements custom widget made available by [Harris Heller](https://twitter.com/HarrisHeller), Sam Woodhall and Mikey Hay.

The purpose of this custom widget is to display the latest stream events (ex. follows, subs, etc.) in a minimalistic feed for  your stream overlay. This widget functions by using a constant amount of space that is recycled infinitely to display events.

## Building the widget
The widget is built using TypeScript instead of vanilla JavaScript. This isn't a concern if you just want to  copy the source code into an overlay on StreamElements. For convenience, the transpiled JavaScript will be committed to the Git repo alongside the TypeScript source. Copy the contents of the `widget.|html|css|js|json` files into the overlay.

If you're making modifications to the project and want to transpile, make sure you have [Node](https://nodejs.org/en/) installed. Run `'npm install'` from the command line in the StreamEventFeed directory to install the node packages. Once the packages are installed, you can run `'npm run build'` from the command line to run the TypeScript compiler. Additionally, you can run `'npm run ts-watch'` to run the TypeScript compiller in watch mode (.ts file changes/saves will trigger a recompile).