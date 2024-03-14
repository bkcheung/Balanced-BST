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
  console.log(bst.insert(9));
  prettyPrint(bst.root);
