# Stream Event Feed

**Full disclosure**: The design and functionality of this widget is my reverse engineering of a streaming overlay used by [Sam Woodhall](https://twitter.com/SamCWoodhall). I fell in love with the aesthetic appeal of the widget that Sam Woodhall commissioned from the exceptionally talented [Mikey Hay/TheFyreWire](https://twitter.com/MikeyHay) and decided that I wanted to do my best to replicate it. Additionally, a lot of the code used here is derived from the "Alpha Rotating Feed V2.2" StreamElements custom widget made available by [Harris Heller](https://twitter.com/HarrisHeller), Sam Woodhall and Mikey Hay.

The purpose of this custom widget is to display the latest stream events (ex. follows, subs, etc.) in a minimalistic feed for  your stream overlay. This widget functions by using a constant amount of space that is recycled infinitely to display events.

