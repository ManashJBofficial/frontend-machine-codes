import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import "./App.css";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };
  return (
    <>
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </>
  );
}

export default App;
