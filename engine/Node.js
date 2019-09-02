// Node is not a singleton class.

class Node {
    constructor(node) {
        this.init(node);
    }

    init(node) {
        this.name = node.name;
        this.id = node.id;
    }
}

module.exports = Node;
