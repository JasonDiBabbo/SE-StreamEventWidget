# Rotating Alert Feed

**Full disclosure**: The design and functionality of this widget is my reverse engineering of a streaming overlay used by [Sam Woodhall](https://twitter.com/SamCWoodhall). I fell in love with the aesthetic appeal of the widget that Sam Woodhall commissioned from the exceptionally talented [Mikey Hay/TheFyreWire](https://twitter.com/MikeyHay) and decided that I wanted to do my best to replicate it. Additionally, a lot of the code used here is derived from the "Alpha Rotating Feed V2.2" StreamElements custom widget made available by [Harris Heller](https://twitter.com/HarrisHeller), Sam Woodhall and Mikey Hay.

The purpose of this custom widget is to display the latest stream alert events (ex. follows, subs, etc.) while making use of very little space on your stream overlay. This widget achieves that by taking the space dedicated to displaying these events and reusing them in a circular manner, similar to a carousel or displays you may see at a bus stop.

