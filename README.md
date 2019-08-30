## Model

* GameLoop
* RNGSingleton / RNG
* Player
* Grammar / Stories
* World / Environment

*Note: Unless mentioned otherwise, all classes below are singletons.*

The entry point of the app is the `GameLoop` class, which keeps the game going until the player quits the game.

Within the `GameLoop` lives the `RNGSingleton` (Random Number Generator Singleton) which is a child of the `RNG` class (that one is not a singleton). The point of the RNG is indeed to provide random numbers and values as needed. It also ensures that the suite of number and values that was provided during the game can be retrieved a posteriori thanks to a seed.

Unsurprisingly, the `Player` class holds properties and methods related to the player of the game.

The `Grammar` class defines rules that dictate the procedural generation of the text while creating the game world. It is tightly coupled to the `Stories` class (not a singleton), which purpose is to serve the content that was generated randomly.

The `World` class is, of course, all about the game world. It works with the `Environment` class (not a singleton), which defines the different spaces that the player can visit within the world.

## Documentation for dependencies
- [Prompts](https://www.npmjs.com/package/prompts)
- Tracery: [website](http://tracery.io/), [editor](http://tracery.io/editor/), [package](https://www.npmjs.com/package/tracery-grammar).

Please note that this project uses a fork of [Tracery](https://github.com/galaxykate/tracery/tree/tracery2).