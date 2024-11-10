const useTraverseTree = () => {
  // Add a file or folder in tree
  // Can be optimised using Dynamic Programming
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, nodeId) => {
    // Base case: If this node is the one to delete, return null
    if (tree.id === nodeId) {
      return null;
    }

    // If the node is a folder, process each item immutably
    if (tree.isFolder && tree.items) {
      const updatedItems = tree.items
        .map((child) => deleteNode(child, nodeId)) // Recursively apply delete to children
        .filter((child) => child !== null); // Remove any deleted (null) nodes

      return { ...tree, items: updatedItems };
    }

    // Return the unchanged node if it does not match nodeId
    return tree;
  };

  const renameNode = () => {};

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
