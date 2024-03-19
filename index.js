function treeNode(data, left = null, right = null){
    return{
        data,
        left,
        right,
    }
}

function tree(arr){
    if(Array.isArray(arr)){
        arr = arr.sort((a,b)=>a-b); //sort
        let prev;
        for(let i=0; i<arr.length; i++){
            if(arr[i]===prev){ arr.splice(i,1);} //remove duplicates
            prev = arr[i];
        }
    }
    return{
        root: buildTree(arr, 0, arr.length-1),
        insert(root, value){
            if(root === null){
                root = treeNode();
                root.data = value;
                return root;
            }
            if(root.data <= value){
                root.right = this.insert(root.right,value);
            }else if(root.data > value){
                root.left = this.insert(root.left,value)
            }
            return root;
        },
        min(root){
            let currNode = root;
            while(currNode.left!==null){
                currNode = currNode.left;
            }
            return currNode.data;
        },
        delete(root, value){
            if(root === null){ //base case
                return root;
            }
            if(root.data > value){ //search in left subtree
                root.left = this.delete(root.left,value);
            } else if(root.data < value){ //search in right subtree
                root.right = this.delete(root.right,value);
            } else { //root has value we want to delete
                if(root.left===null && root.right===null){ //root has no children
                    return null;
                } else if(root.left===null){ //if root has 1 child
                    return root.right;
                } else if(root.right===null){ 
                    return root.left;
                } else { //if root has 2 children
                    root.data = this.min(root.right);
                    root.right = this.delete(root.right, root.data);
                }
            }
            return root;
        },
        find(root,value){
            if(root===null || root.data===value){
                return root;
            }
            if(root.data > value){
                return this.find(root.left, value);
            }else{
                return this.find(root.right, value);
            }
        },
        levelOrder(callback){
            let queue = [this.root];
            let nums = []
            let currNode;
            while(queue.length>0){
                currNode = queue.shift();
                nums.push(currNode.data); 
                if(currNode.left!==null) queue.push(currNode.left);
                if(currNode.right!==null) queue.push(currNode.right);
                if(callback) callback(currNode);
            }
            if(!callback)return nums;
        },
        inOrder(root, callback, arr=[]){
            //base case
            if(root===null) return root;
            //traverse left subtree
            if(root.left) this.inOrder(root.left, callback, arr);
            //visit node
            arr.push(root.data);
            //traverse right subtree
            if(root.right) this.inOrder(root.right,callback, arr);
            return arr;
        },
        preOrder(root, callback, arr=[]){
            //base case
            if(root===null) return root;
            //visit node
            arr.push(root.data);
            //traverse left subtree
            if(root.left) this.preOrder(root.left, callback, arr);
            //traverse right subtree
            if(root.right) this.preOrder(root.right, callback, arr);
            return arr;
        },
        postOrder(root, callback, arr=[]){
            //base case
            if(root===null) return root;
            //traverse left subtree
            if(root.left) this.postOrder(root.left, callback, arr);
            //traverse right subtree
            if(root.right) this.postOrder(root.right, callback, arr);
            //visit node
            arr.push(root.data);
            return arr;
        },
        height(node){
            //base case
            if(node===null) return 0;
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        },
        depth(node, root, depth=0){
            if(node===null||root===null) return;
            if(node.data===root.data) return depth;
            if(root.data < node.data){
                return this.depth(node, root.right, depth+=1);
            } 
            else if(root.data > node.data){
                return this.depth(node, root.left, depth+=1);
            } 
        },
        isBalanced(root){
            if(root===null) return;
            const leftHeight = this.height(root.left);
            const rightHeight = this.height(root.right);
            if(Math.abs(leftHeight-rightHeight)<2){
                return true;
            } 
        }
    }
}

function buildTree(arr, start, end){
    if(start > end){
        return null;
    }
    let mid = Math.round((start+end)/2);
    let root = treeNode();

    root.data = arr[mid];
    root.left = buildTree(arr, start, mid-1);
    root.right = buildTree(arr, mid+1, end);
    return root;
}

//Testing
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

  let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  let bst = tree(arr);
  prettyPrint(bst.root);
  console.log(bst.depth(bst.find(bst.root,1), bst.root));
  console.log(bst.isBalanced(bst.root));
