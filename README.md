# Balanced-BST
Balanced binary search tree implementation for The Odin Project.

**Includes:**
* **Node** class/factory
* **Tree** class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree
* **buildTree(array)** function that takes an array of data and turns it into a balanced binary tree
* **insert(value)** and **deleteItem(value)** functions that insert/delete the given value
* **find(value)** function that returns the node with the given value
* **levelOrder(callback)** function that accepts an optional callback function as its parameter
* **inOrder(callback)**, **preOrder(callback)**, and p**ostOrder(callback)** functions that also accept an optional callback as a parameter.
* **height(node)** function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node
* **depth(node)** function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node
* **isBalanced** function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1
* **rebalance** function that rebalances an unbalanced tree
