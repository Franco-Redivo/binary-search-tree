import { Node } from "./node.js";

export class Tree{
    constructor(array){
        let s = new Set(array);
        let noDupArray = [...s];
        this.array = noDupArray;
        this.root = this.buildTree();
    }

    buildTree(array = this.array,start = 0, end = array.length){
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
}