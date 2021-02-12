# Stream Event Widget

This is a custom implementation of a stream event widget for use on the [StreamElements](https://streamelements.com) platform. Streamers can use this widget to display information about the latest events on their stream. Some of the events that can be display include but are not limited to: followers, subscriptions, cheers.

An important note is that this implementation is meant for use on **Twitch** live streams. StreamElements does offer API support for streaming on other platforms like YouTube or Facebook Gaming and this implementation could be forked to work with those platforms.

If you're new to the StreamElements platform and/or have any questions about custom widgets, check out [this](https://blog.streamelements.com/how-can-you-become-a-code-guru-87071f223e1b) blog post.

## Using the widget with StreamElements

To use the widget on your StreamElements overlay, copy the content of the `widget.html|css|js|json` files in `dist/` to a custom widget defined in your overlay.

## Building the widget

This widget is built with TypeScript. The StreamElements custom widget interface requires a single JavaScript file. This is achieved using [Webpack](https://webpack.js.org/) for the bundling process. All of the transpiled TypeScript code is bundled into a single `widget.js` file in `dist/`.

If you want to fork the project or clone it and make any changes, building is really simple. Make sure you have the latest version of [Node.js](https://nodejs.org/en/) installed and install all of the development packages by running `npm install` in the project. The table below describes the different NPM scripts you can use by running `npm run {script_name}`.

| **Name**      | **Description**                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `build`       | Transpiles TypeScript code and bundles the JAvaScript code into `widget.js` in `dist/`.                            |
| `build:watch` | Runs the `build` script in watch mode. This will rerun the transpile/bundle process whenever changes are detected. |
| `clean`       | Cleans build output.                                                                                               |
| `lint`        | Lints the project to report on best practice patterns in TypeScript code.                                          |

# Contact

If you have questions about this widget or anything about streaming, feel free to drop by my stream or send me a DM on Twitter.

-   [Twitch](https://twitch.tv/monsterabe)
-   [Twitter](https://twitter.com/jasondibabbo)
