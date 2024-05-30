import React, { useState } from 'react';
import '../Styles/PageStyles/Modal.css'; 
import '../Styles/PageStyles/DynamicForm.css'

const Modal = ({ showModal, closeModal, handleAddObject, handleAddField }) => {
  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>Add Object/Field</h2>
          <button onClick={handleAddObject}>Add Object</button>
          <button onClick={handleAddField}>Add Field</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    )
  );
};

function DynamicForm() {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  const handleRemoveField = (path) => {
    setFormData((prevData) => {
      let newData = { ...prevData };
      let currentObj = newData;
      for (const key of path.slice(0, -1)) {
        currentObj = currentObj[key];
      }
      delete currentObj[path[path.length - 1]];
      return newData
    });
  };
  const handleNestedChange = (e, path) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let newData = { ...prevData };
      let currentObj = newData;
      for (const key of path.slice(0, -1)) {
        currentObj = currentObj[key]
      }
      currentObj[path[path.length - 1]] = value;
      return newData;
    });
  };

  const handleAddObjectOrField = (path) => {
    setShowModal(true);
    setCurrentPath(path);
  };

  const handleAddObject = () => {
    const objName = prompt(`Enter name for new object in ${currentPath.join('.')}:`);
    if (objName) {
      setFormData((prevData) => {
        let newData = { ...prevData };
        let currentObj = newData;
        for (const key of currentPath) {
          if (!currentObj.hasOwnProperty(key)) {
            currentObj[key] = {};
          }
          currentObj = currentObj[key];
        }
        currentObj[objName] = {};
        return newData;
      });
      setCurrentPath([...currentPath, objName]);
    }
    setShowModal(false);
  };

  const handleAddField = () => {
    const key = prompt(`Enter key for new field in ${currentPath.join('.')} object:`);
    if (key) {
      const value = prompt(`Enter value for ${key}:`);
      if (value !== null) {
        setFormData((prevData) => {
          let newData = { ...prevData };
          let currentObj = newData;
          for (const key of currentPath) {
            if (!currentObj.hasOwnProperty(key)) {
              currentObj[key] = {};
            }
            currentObj = currentObj[key];
          }
          currentObj[key] = value;
          return newData;
        });
      }
    }
    setShowModal(false);
  };

  const renderFields = (data, path = []) => {
    return Object.entries(data).map(([key, value]) => {
      const fieldPath = [...path, key];
      const fieldName = fieldPath.join('.');
      return (
        <div key={fieldName}>
          {typeof value === 'object' ? (
            <>
              <button onClick={() => handleAddObjectOrField(fieldPath)}>Add to Object: {key}</button>
              <button onClick={() => handleRemoveField(fieldPath)} className='remove-btn'>Remove Object: {key}</button>
              {renderFields(value, fieldPath)}
            </>
          ) : (
            <>
              <input
                type="text"
                name={fieldName}
                value={value}
                onChange={(e) => handleNestedChange(e, fieldPath)}
              />
              <button onClick={() => handleRemoveField(fieldPath)} className='remove-btn'>Remove Field: {key}</button>
            </>
          )}
        </div>
      );
    });
  };

  const handleConsoleData = () => {
    console.log(formData);
  };

  return (
    <div>
      {renderFields(formData)}
      <button onClick={() => handleAddObjectOrField([])}>Add Object/Field</button>
      <button onClick={handleConsoleData} className='console-btn'>Console Data</button>

      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleAddObject={handleAddObject}
        handleAddField={handleAddField}
      />
    </div>
  );
}

export default DynamicForm;

