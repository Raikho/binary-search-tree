class Node {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(array) {
        this.root = null;
        this.buildTree(array);
    }

    buildTree(array) {
        this.root = new Node(array[0]);
        this.root.right = new Node(array[1]);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    console.log('TESTING');
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let tree = new Tree([1,2,3,4,5,6]);
console.log(tree);
prettyPrint(tree.root);