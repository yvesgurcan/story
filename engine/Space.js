// Space is not a singleton class.

class Space {
    constructor(space) {
        this.init(space);
    }

    init(space) {
        this.name = space.name;
        this.id = space.id;
    }
}

module.exports = Space;
