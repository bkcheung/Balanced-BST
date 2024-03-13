let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(tree(arr).root);

function node(value, left = null, right = null){
    return{
        value,
        left,
        right,
    }
}

function tree(arr){
    if(Array.isArray(arr)){
        arr = arr.sort((a,b)=>a-b); //sort
        let prev = '';
        for(let i=0; i<arr.length; i++){
            if(arr[i]===prev){ arr.splice(i,1);} //remove duplicates
            prev = arr[i];
        }
    }
    return{
        root: buildTree(arr, 0, arr.length - 1),
    }
}

function buildTree(arr, start, end){
    if(start > end){
        return null;
    }
    let mid = Math.round((start+end)/2);
    let treeNode = node();
    treeNode.value = arr[mid];
    treeNode.left = buildTree(arr.slice(0,mid),start,mid-1);
    treeNode.right = buildTree(arr.slice(mid+1,end),mid+1, end);
    return treeNode;
}
