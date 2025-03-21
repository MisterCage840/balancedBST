const node = (data, left = null, right = null) => {
  const getData = () => data;
  const setData = (data) => (this.data = data);

  const getLeft = () => left;
  const setLeft = (leftNode) => (left = leftNode);

  const getRight = () => right;
  const setRight = (rightNode) => (right = rightNode);

  return { getData, setData, getLeft, setLeft, getRight, setRight };
};

//sorting algo
const mergeSort = (arr, l, h) => {
  if (l < h) {
    let mid = Math.floor((l + h) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, h);
    merge(arr, l, mid, h);
  }
};

const merge = (arr, l, mid, h) => {
  const left = arr.slice(l, mid + 1);
  const right = arr.slice(mid + 1, h + 1);
  let i = 0;
  j = 0;
  k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    j++;
    k++;
  }
};
//build the balanced binary search tree
const buildTree = (array, start, end) => {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  let root = node(array[mid]);

  root.setLeft(buildTree(array, start, mid - 1));
  root.setRight(buildTree(array, mid + 1, end));

  return root;
};

//insert elemeent to assorted array
const insertElement = (arr, value) => {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < value) left = mid + 1;
    else right = mid - 1;
  }
  arr.splice(left, 0, value);
  return arr;
};

//insert elemeent to assorted array
const deleteElement = (arr, value) => {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < value) left = mid + 1;
    else right = mid - 1;
  }
  arr.splice(left, 1);
  return arr;
};

//remove duplicate values
const removeDup = (arr) => {
  return [...new Set(arr)];
};

//main tree factory function
const tree = (arr, root = null) => {
  arr = removeDup(arr);
  mergeSort(arr, 0, arr.length - 1);

  const getSortedArray = () => arr;
  const getRoot = () => buildTree(arr, 0, arr.length - 1);

  const insert = (value) => {
    const rootNode = buildTree(arr, 0, arr.length - 1);
    const insertNode = node(value);
    insertElement(arr, value);
    let cur = rootNode;
    while (cur) {
      if (value > cur.getData()) {
        if (cur.getRight()) cur = cur.getRight();
        else {
          cur.setRight(insertNode);
          return cur.getRight();
        }
      } else if (value < cur.getData()) {
        if (cur.getLeft()) cur = cur.getLeft();
        else {
          cur.setLeft(insertNode);
          return cur.getLeft();
        }
      }
    }
  };

  const deleteItem = (value) => {
    let rootNode = buildTree(arr, 0, arr.length - 1);
    let cur = rootNode;
    let parent = null;
    while (cur && cur.getData() != value) {
      parent = cur;
      if (value < cur.getData()) cur = cur.getLeft();
      else cur = cur.getRight();
    }
    if (!cur) {
      console.log("Value not found in BST");
      return;
    }
    //no children leaf node
    if (!cur.getLeft && !cur.getRight) {
      if (!parent) rootNode = null;
      if (parent.getLeft()) parent.setLeft(null);
      else parent.setRight(null);
    }
    // 1 left child
    else if (!cur.getRight) {
      if (!parent) rootNode = cur.getLeft();
      if (parent.getLeft() == cur) parent.setLeft(cur.getLeft());
      else parent.setRight(cur.getLeft());
    }
    //1 right child
    else if (!cur.getLeft()) {
      if (!parent) rootNode = cur.getRight();
      if (parent.getLeft() == cur) parent.setLeft(cur.getRight());
      else parent.setRight(cur.getRight());
    } else {
      let successor = cur.getRight();
      let successorParent = cur;

      while (successor.getLeft()) {
        successorParent = successor;
        successor = successor.getLeft();
      }

      cur.setData(successor.getData());
      if (successorParent.getLeft() == successor)
        successorParent.setLeft(successor.getRight());
      else successorParent.setRight(successor.getRight());
    }
    deleteElement(arr, value);
  };

  const find = (value) => {
    let rootNode = buildTree(arr, 0, arr.length - 1);
    let cur = rootNode;
    while (cur && cur.getData() != value) {
      if (value < cur.getData()) cur = cur.getLeft();
      else cur = cur.getRight();
    }
    if (cur && cur.getData() == value) return cur;
    else console.log("Value does not exist in the BST");
  };

  const levelOrder = (root) => {
    if (!root) return;
    let levelString = "",
      queue = [];
    queue.push(root);
    while (queue.length) {
      let cur = queue.shift();
      levelString += cur.getData() + ", ";
      if (cur.getLeft()) queue.push(cur.getLeft());
      if (cur.getRight()) queue.push(cur.getRight());
    }
    return levelString;
  };

  const preOrder = (root) => {
    if (!root) return;
    console.log(root.getData() + ", ");
    preOrder(root.getLeft());
    preOrder(root.getRight());
  };

  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.getLeft());
    console.log(root.getData());
    inOrder(root.getRight());
  };

  const postOrder = (root) => {
    if (!root) return;
    postOrder(root.getLeft());
    postOrder(root.getRight());
    console.log(root.getData());
  };

  const depth = (value) => {
    let rootNode = buildTree(arr, 0, arr.length - 1);
    let cur = rootNode;
    let depthCount = 1;
    while (cur && cur.getData() != value) {
      if (value < cur.getData()) {
        cur = cur.getLeft();
        depthCount++;
      } else {
        cur = cur.getRight();
        depthCount++;
      }
    }
    if (cur && cur.getData() == value) return depthCount;
    else console.log("Value does not exist in the BST");
  };

  return {
    getSortedArray,
    getRoot,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    depth,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.getRight() !== null) {
    prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
  if (node.getLeft() !== null) {
    prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const t1 = tree([1, 1, 1, 12, 3, 4, 9, 123, 45, 5678, 3, 55, 5, 5, 5, 5]);

t1.insert(98).getData();
t1.deleteItem(45);
console.log(prettyPrint(t1.getRoot()));

console.log(t1.postOrder(t1.getRoot()));
// console.log(t1.depth(20)); //testing depth
