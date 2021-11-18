# Stream Event Widget

This is a custom implementation of a stream event widget for use on the [StreamElements](https://streamelements.com) platform. Streamers can use this widget to display information about the latest events on their stream.

If you're new to the StreamElements platform and/or have any questions about custom widgets, check out [this](https://blog.streamelements.com/how-can-you-become-a-code-guru-87071f223e1b) blog post.

**Note**: This implementation is meant for use on **Twitch** live streams. StreamElements does offer API support for streaming on other platforms like YouTube or Facebook Gaming and it is my intention to create a fork repository of this one that is for the same purpose on YouTube Gaming.

## Using the widget

To include the widget on your StreamElements overlay, first go to your StreamElements dashboard and create a new overlay. Copy the content of the `widget.html|css|js|json` files in the `dist/` directory to a custom widget. The compiled widget files are included in the repository for ease-of-use.

There's no rule saying that you can't include this widget on an already-existing overlay, but it was designed to be used as the only widget present in an overlay.

## Building the source

The widget is built mainly using TypeScript and vanilla HTML/CSS. The TypeScript is transpiled and bundled using [Webpack](https://webpack.js.org/). The generated files are located into the `dist/` directory.

### Prerequisites

The latest version of [Node.js](https://nodejs.org/en/) is recommended to build the project. Once Node.js is installed, dependencies can be installed by running this command at the root of the project.

```
npm install
```

### Build Scripts

The table belows lists the different build scripts included with the project and what they do.

| **Name**      | **Description**                                                    |
| ------------- | ------------------------------------------------------------------ |
| `build`       | Runs the full build and binplaces output in the `dist/` directory. |
| `build:watch` | Watches project files and rebuilds whenever changes are saved.     |
| `clean`       | Cleans the build output.                                           |
| `lint`        | Lints the project to report on best practices in TypeScript code.  |

Build scripts can be executed from the command line by running the following command inside of the project.

```
npm run {script name}
```

# Contact

If you have questions about this widget or anything about streaming, feel free to drop by my stream or send me a DM on Twitter.

-   [Twitch](https://twitch.tv/monsterabe)
-   [Twitter (Content Creation)](https://twitter.com/monsterabe_)
-   [Twitter (Personal & Professional)](https://twitter.com/jasondibabbo)
