import { Tree } from "./tree.js";

// Function to generate an array of random numbers
function generateRandomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Step 1: Create BST with random numbers
let randomNumbers = generateRandomArray(10);
console.log("Initial random numbers:", randomNumbers);

let tree = new Tree(randomNumbers);

// Step 2: Confirm the tree is balanced
console.log("Is tree balanced?", tree.isBalanced(tree.root));

// Step 3: Print elements in level, pre, post, and in order
console.log("Level Order:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order:");
tree.postOrder(node => console.log(node.data));

console.log("In Order:");
tree.inOrder(node => console.log(node.data));

// Step 4: Unbalance the tree by adding numbers > 100
tree.insert(tree.root, 120);
tree.insert(tree.root, 150);
tree.insert(tree.root, 170);
tree.insert(tree.root, 200);
tree.insert(tree.root, 220);

console.log("Inserted values greater than 100");

// Step 5: Confirm the tree is now unbalanced
console.log("Is tree balanced after insertions?", tree.isBalanced(tree.root));

// Step 6: Balance the tree
tree.rebalance();
console.log("Tree has been rebalanced");

// Step 7: Confirm the tree is balanced
console.log("Is tree balanced after rebalancing?", tree.isBalanced(tree.root));

// Step 8: Print elements in level, pre, post, and in order again
console.log("Level Order after rebalancing:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre Order after rebalancing:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order after rebalancing:");
tree.postOrder(node => console.log(node.data));

console.log("In Order after rebalancing:");
tree.inOrder(node => console.log(node.data));

