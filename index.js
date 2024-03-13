let sortedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(tree(sortedArr).root);

function node(value, left = null, right = null){
    return{
        value,
        left,
        right,
    }
}

function tree(array){
    return{
        root: buildTree(array, 0, array.length - 1),
    }
}

function buildTree(array, start, end){
    if(start > end){
        return null;
    }
    let mid = Math.round((start+end)/2);
    let treeNode = node();
    treeNode.value = array[mid];
    treeNode.left = buildTree(array.slice(0,mid),start,mid-1);
    treeNode.right = buildTree(array.slice(mid+1,end),mid+1, end);
    return treeNode;
}