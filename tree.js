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

        console.log(array); // DEBUG
        this.sort(array);
        console.log(array); // DEBUG
        this.removeDuplicates(array);
        console.log(array); // DEBUG

        this.buildTree(array, this.root);
    }

    buildTree(array, root) {
        if (!array.length) return;

        let mid = Math.trunc(array.length / 2);
        root.data = array[mid];

        let left = array.slice(0, mid);
        let right = array.slice(mid + 1, array.length);
        if (left.length) {
            root.left = new Node();
            this.buildTree(left, root.left);
        }
        if (right.length) {
            root.right = new Node();
            this.buildTree(right, root.right);
        }
    }

    sort(array) {
        for (let i = array.length - 1; i > 1; i--) {
            for (let j = 0; j < i; j++) {
                let first = array[j];
                let second = array[j + 1];
                if (second < first) {
                    array[j + 1] = first;
                    array[j] = second;
                }
            }
        }
    }
    removeDuplicates(array) {
        for (let i = 0; i < array.length - 1;) {
            let first = array[i];
            let second = array[i + 1];
            if (second === first)
                array.splice(i,1);
            else
                i++;
        }
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

let array = [1,7,4,23,8,9,4,3,5,5,5,7,9,67,6345,324];
let tree = new Tree(array);
console.log(tree);
prettyPrint(tree.root);