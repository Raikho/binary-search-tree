class Node {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(array) {
        this.root = new Node();
        this.buildTree(array, this.root);
    }

    buildTree(array, root) {

        if (!array.length) return;

        let mid = Math.trunc(array.length / 2);
        root.data = array[mid];

        let left = array.slice(0, mid);
        let right = array.slice(mid + 1, array.length);

        console.log('left: ', left);
        console.log('right: ', right);

        if (left.length) {
            root.left = new Node();
            this.buildTree(left, root.left);
        }
        if (right.length) {
            root.right = new Node();
            this.buildTree(right, root.right);
        }




        // 0 to (mid - 1), (mid + 1) - (array.length-1)

        // this.root = new Node(array[0]);
        // this.root.right = new Node(array[1]);
        // this.root.left = new Node(array[2]);
        // this.root.right.right = new Node(array[3]);
        // this.root.left.right = new Node(array[4]);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
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

let array = [1,2,3,4,5,6,7,8,9];
let tree = new Tree(array);
console.log(tree);
prettyPrint(tree.root);