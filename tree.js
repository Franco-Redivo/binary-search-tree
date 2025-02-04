import { Node } from "./node.js";

export class Tree{
    constructor(array){
        let s = new Set(array);
        let noDupArray = [...s];
        this.array = noDupArray.sort((a,b) => a - b);
        this.root = this.buildTree();
    }

    buildTree(array = this.array,start = 0, end = array.length - 1){
        if(start > end) return null;

        let mid = start + Math.floor((end - start) / 2);

        let root = new Node(array[mid]);

        root.left = this.buildTree(array,start,mid - 1);

        root.right = this.buildTree(array,mid + 1, end);

        return root;
    }

    insert(root,data){
        if(root === null){
            root = new Node(data);
            return root;
        }

        if(data < root.data){
            root.left = this.insert(root.left,data);
        }else{
            root.right = this.insert(root.right,data);
        }

        return root;
    }

    getSuccessor(root){
        root = root.right;
        while(root !==null && root.left !==null){
            root = root.left;
        }
        return root;
    }

    deleteNode(root,data){
        if(root === null) return root;

        if(data < root.data){
            root.left = this.deleteNode(root.left,data);
        }else if(data > root.data){
            root.right = this.deleteNode(root.right,data);
        }else{
            if(root.left === null){
                return root.right;
            }else if(root.right === null){
                return root.left;
            }

            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteNode(root.right,successor.data);
        }

        return root;
    }

    findNode(root,data){
        if(root === null) return false;

        if(data < root.data){
            return this.findNode(root.left,data);
        }else if(data > root.data){
            return this.findNode(root.right,data);
        }else{
            return root;
        }
    }

    levelOrder(callback){
        if(typeof callback !== 'function') throw new Error('callback is required');
        let queue = [];
        queue.push(this.root);
        while(queue.length > 0){
            let node = queue.shift();
            callback(node);
            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
        }
    }

    inOrder(callback){
        if(typeof callback !== 'function') throw new Error('callback is required');
        let stack = [];
        let current = this.root;
        while(current !== null || stack.length > 0){
            while(current !== null){
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            callback(current);
            current = current.right;
        }
    }

    preOrder(callback){
        if(typeof callback !== 'function') throw new Error('callback is required');
        let stack = [];
        stack.push(this.root);
        while(stack.length > 0){
            let node = stack.pop();
            callback(node);
            if(node.right !== null) stack.push(node.right);
            if(node.left !== null) stack.push(node.left);
        }
    }

    postOrder(callback){
        if(typeof callback !== 'function') throw new Error('callback is required');
        let stack = [];
        let current = this.root;
        let lastVisited = null;
        while(current !== null || stack.length > 0){
            while(current !== null){
                stack.push(current);
                current = current.left;
            }
            let peekNode = stack[stack.length - 1];
            if(peekNode.right !== null && lastVisited !== peekNode.right){
                current = peekNode.right;
            }else{
                callback(peekNode);
                lastVisited = stack.pop();
            }
        }
    }

    height(node){
        if(node === null) return -1;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight,rightHeight) + 1;
    }

    depth(node, root = this.root, depthCount = 0) {
        if (root === null || node === null) return -1;
        if (root === node) return depthCount;
        return node.data < root.data
            ? this.depth(node, root.left, depthCount + 1)
            : this.depth(node, root.right, depthCount + 1);
    }
    

    isBalanced(node = this.root) {
        function checkBalance(node) {
            if (node === null) return 0;
            let leftHeight = checkBalance(node.left);
            let rightHeight = checkBalance(node.right);
            if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;
            return Math.max(leftHeight, rightHeight) + 1;
        }
        return checkBalance(node) !== -1;
    }
    

    rebalance(){
        let array = [];
        this.inOrder(node => array.push(node.data));
        this.root = this.buildTree(array);
    }
}