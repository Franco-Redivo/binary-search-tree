import { Tree } from "./tree.js"

const arr = [1,2,3,4,5];

const tree = new Tree(arr);

let root = tree.buildTree();

// tree.insert(root,11);
// tree.insert(root,9);
// tree.insert(root,8);
// console.log(root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};



// prettyPrint(root);
