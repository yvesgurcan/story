## v0.0.4 - 2019-09-01

- Looking for interesting rules to generate nodes.

## v0.0.3 - 2019-08-30

- The RNG can now generate plausible proper names procedurally.
- The RNG can now randomly pick an element within an array. Each element may have a custom probability to be picked or they can all have the same probability of being picked.
- The RNG can perform a check against a probability and return if the check was a success or a failure (i.e., the random value was below the number that represents the success rate). For example: If the check produces a random value of 0.23548 and there is a 0.80 chance (aka 80% chance) of success, the check will succeed. If the generated random value is 0.85, the check will fail.
- Started working on generating the world and its various environments.

## v0.0.2 - 2019-08-29

- Crude implementation of Tracery to build grammars and generate text string procedurally.

## v0.0.1 - 2019-08-29

- Added a random number generator that can take a seed.
- Added prompts to execute simple commands (new game or quit) and generate a character.