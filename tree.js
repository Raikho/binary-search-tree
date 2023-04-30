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

        this.sort(array);
        this.removeDuplicates(array);

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
        // Works for sorted arrays
        for (let i = 0; i < array.length - 1;) {
            let first = array[i];
            let second = array[i + 1];
            if (second === first)
                array.splice(i,1);
            else
                i++;
        }
    }

    insert(value, node = this.root) {
        if (!node) this.root = new Node(value);

        if (value > node.data) {
            if (node.right)
                this.insert(value, node.right);
            else {
                node.right = new Node(value);
                return;
            }
        } else if (value < node.data) {
            if (node.left)
                this.insert(value, node.left);
            else {
                node.left = new Node(value);
                return;
            }
        } else return;
    }

    delete(value) {
        let node = this.root;
        let parent = {};
        while (value !== node.data) {
            if (value > node.data) {
                parent = {node: node, direction: 'right'}
                node = node.right;
            }
            else if (value < node.data) {
                parent = {node: node, direction: 'left'}
                node = node.left;
            }
        }

        if (!node.left && !node.right)
            parent.node[parent.direction] = null;

        else if (node.left && !node.right)
            parent.node[parent.direction] = node.left;

        else if (!node.left && node.right)
            parent.node[parent.direction] = node.right;

        else if (node.left && node.right) {
            // find next biggest
            console.log('node to delete: ', node);
            let nextBiggestParent = null;
            let nextBiggest = node.right;
            while (nextBiggest.left) {
                nextBiggestParent = nextBiggest;
                nextBiggest = nextBiggest.left;
            }

            // if next biggest is the  direct child
            if (!nextBiggestParent) {
                node.data = nextBiggest.data;
                node.right = null;
                return;
            }

            // remove next biggest
            nextBiggestParent.left = (nextBiggest.right) ? nextBiggest.right : null;

            // replace original node with next biggest
            node.data = nextBiggest.data;
        }
    }

    find(value) {
        let node = this.root;
        while (true) {
            if (value > node.data) {
                if (node.right)
                    node = node.right;
                else break;
            }
            else if (value < node.data) {
                if (node.left)
                    node = node.left;
                else break;
            }
            else return node;
        }
        return `${value} was not found.`;
    }

    levelOrder(callback = x => x) {
        let queue = [this.root];
        let output = [];

        while (queue.length) {
            let node = queue.shift();
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
            output.push(callback(node.data));
        }
        return output;
    }

    inorder(callback = x => x, node = this.root, array = []) {
        if (node.left) this.inorder(callback, node.left, array);
        array.push(callback(node.data));
        if (node.right) this.inorder(callback, node.right, array);
        return array;
    }
    preorder(callback = x => x, node = this.root, array = []) {
        array.push(callback(node.data));
        if (node.left) this.preorder(callback, node.left, array);
        if (node.right) this.preorder(callback, node.right, array);
        return array;
    }
    postorder(callback = x => x, node = this.root, array = []) {
        if (node.left) this.postorder(callback, node.left, array);
        if (node.right) this.postorder(callback, node.right, array);
        array.push(callback(node.data));
        return array;
    }

    height(node, height = {max: 0, steps: 0}) {
        if (!node.left && !node.right)
            if (height.steps >= height.max)
                height.max = height.steps;

        if (node.left) {
            height.steps++;
            this.height(node.left, height);
            height.steps--;
        }
        if (node.right) {
            height.steps++;
            this.height(node.right, height);
            height.steps--;
        }

        return height.max;
    }
    depth(node, depth = {value: 0}, currentNode = this.root) {
        if (node.data > currentNode.data) {
            depth.value++;
            this.depth(node, depth, currentNode.right);
        }
        else if (node.data < currentNode.data) {
            depth.value++;
            this.depth(node, depth, currentNode.left);
        }
        return depth.value;
    }

    isBalanced() {
        let leftHeight = this.height(this.root.left);
        let rightHeight = this.height(this.root.right);
        if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1)
            return false;
        return true;
    }

    rebalance() {
        let array = this.inorder();
        this.root = new Node();
        this.buildTree(array, this.root);
    }
}

function randomArray(length = 10, max = 100) {
    let array = []
    for (let i = 0; i < length; i++)
        array.push(Math.round(Math.random() * max));
    return array;
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

console.log('Creating Random Tree');
let tree = new Tree((randomArray()));
prettyPrint(tree.root);
console.log('is tree balanced?: ', tree.isBalanced());
console.log('level order: ', tree.levelOrder());
console.log('pre order: ', tree.preorder());
console.log('in  order: ', tree.inorder());
console.log('post order: ', tree.postorder());
console.log('unbalancing...');
tree.insert(120);
tree.insert(140);
tree.insert(160);
tree.insert(180);
prettyPrint(tree.root);
console.log('is tree balanced?: ', tree.isBalanced());
console.log('balancing...');
tree.rebalance();
prettyPrint(tree.root);
console.log('level order: ', tree.levelOrder());
console.log('pre order: ', tree.preorder());
console.log('in  order: ', tree.inorder());
console.log('post order: ', tree.postorder());