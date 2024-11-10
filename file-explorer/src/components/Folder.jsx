import { useState } from "react";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  explorer,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [rename, setRename] = useState({
    visible: false,
    isFolder: null,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const handleNewFile = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onRenameFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(explorer.id, e.target.value);
      setShowInput({ ...showInput, visible: false });
      setRename({ ...rename, visible: false });
    }
  };

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
    setShowInput({ ...showInput, visible: false });
  };
  const handleRenameFileFolder = (e, isFolder) => {
    e.stopPropagation();
    if (isFolder === true) {
      setExpand(true);
    }
    setRename({
      visible: true,
      isFolder: isFolder,
    });
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="add-btn"
              onClick={(e) => handleNewFolder(e, true)}
            >
              folder +
            </button>
            <button
              className="add-btn"
              onClick={(e) => handleNewFile(e, false)}
            >
              file +
            </button>
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteFolder(e, true)}
            >
              folder -
            </button>
            <button
              className="delete-btn"
              onClick={(e) => handleRenameFileFolder(e, true)}
            >
              rename
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={(e) => onAddFolder(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {rename.visible && (
            <div className="inputContainer">
              <span>{rename.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                placeholder={explorer.name}
                onKeyDown={(e) => onRenameFolder(e)}
                onBlur={() => setRename({ ...rename, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((e) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                explorer={e}
                key={e.id}
              >
                {e.name}
              </Folder>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <div className="file">📄 {explorer.name}</div>
        <button
          className="delete-btn"
          onClick={(e) => handleDeleteFolder(e, true)}
        >
          file -
        </button>
        <button
          className="delete-btn"
          onClick={(e) => handleRenameFileFolder(e, false)}
        >
          rename
        </button>
        {rename.visible && !rename.isFolder && (
          <input
            type="text"
            className="inputContainer__input"
            autoFocus
            placeholder={explorer.name}
            onKeyDown={(e) => onRenameFolder(e)}
            onBlur={() => setRename({ ...rename, visible: false })}
          />
        )}
      </div>
    );
  }
};

export default Folder;
