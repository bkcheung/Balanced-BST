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
        insert(value){
            if(isNaN(value)){
                return "Error, please enter number";
            }
            let currNode = this.root;
            let prevNode;
            while(currNode!==null){
                if(value >= currNode.data){
                    prevNode = currNode;
                    currNode = currNode.right;
                } else if(value < currNode.data){
                    prevNode = currNode;
                    currNode = currNode.left;
                }
            }
            currNode = treeNode();
            currNode.data = Number(value);
            if(currNode.data < prevNode.data){
                prevNode.left = currNode;
            } else {
                prevNode.right = currNode;
            }
            return this.root;
        },
        delete(value){
            let delNode = this.root;
            let prevNode;
            while(delNode.data!==value){
                if(value >= delNode.data){
                    prevNode = delNode;
                    delNode = delNode.right;
                } else if(value < delNode.data){
                    prevNode = delNode;
                    delNode = delNode.left;
                }
            }
            console.log(`Found value: ${delNode.data}`)
            let rightChild = delNode.right;
            let leftChild = delNode.left;
            //No children; leaf node
            if(rightChild===null && leftChild===null){
                delNode.data = null;
                if(delNode.data < prevNode.data){
                    prevNode.left = null;
                } else {
                    prevNode.right = null;
                }
            }
            //one child
            if(rightChild!==null || leftChild!==null){
                if(rightChild!==null){
                    console.log("del right");
                    delNode.data = rightChild.data;
                    delNode.right = null;
                } else{
                    console.log("del left");
                    delNode.data = leftChild.data;
                    delNode.left = null;
                }
            }
            // //two children
            // if(rightChild!==null && leftChild!==null){

            // }
            // //Relationship between prev node and node to delete
            // if(delNode.data < prevNode.data){
                
            // }
            
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
  bst.delete(23);
  prettyPrint(bst.root);
