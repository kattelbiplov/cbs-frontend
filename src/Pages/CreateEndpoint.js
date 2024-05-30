import React, { useState } from "react";
import '../Styles/PageStyles/CreateEndpoint.css';

const CreateEndpoint = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [method, setMethod] = useState('POST');
  const [path, setPath] = useState('');
  const [requestBody, setRequestBody] = useState([{ key: '', value: '', type: 'field' }]);

  const handleRequestBodyChange = (index, key, value) => {
    const newRequestBody = [...requestBody];
    newRequestBody[index] = { key, value, type: 'field' };
    setRequestBody(newRequestBody);
  };
  
  const addField = () => {
    setRequestBody([...requestBody, { key: '', value: '', type: 'field' }]);
  };

  const addObject = () => {
    setRequestBody([...requestBody, { key: '', type: 'object' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      method,
      path,
      request_body: requestBody.reduce((acc, { key, value, type }) => { 
        if (type === 'field') {
          acc[key] = value;
        } else if (type === 'object') {
          acc[key] = {};
        }
        return acc;
      }, {})
    };
    console.log(formData)
  };

  return (
    <div className="create-endpoint-container">
      <h1>Create Endpoint</h1>
      <form className="create-endpoint-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label>
          Path:
          <input type="text" value={path} onChange={(e) => setPath(e.target.value)} />
        </label>
        <div className="request-body-container">
          {requestBody.map((field, index) => (
            <div key={index} className="request-body-row">
              <input
                type="text"
                placeholder="Key"
                value={field.key}
                onChange={(e) => handleRequestBodyChange(index, e.target.value, field.value)}
              />
              {field.type === 'field' && (
                <input
                  type="text"
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => handleRequestBodyChange(index, field.key, e.target.value)}
                />
              )}
              {index === requestBody.length - 1 && field.type === 'object' && (
                <button type="button" onClick={addField}>Add Field</button>
              )}
              {index === requestBody.length - 1 && (
                <button type="button" onClick={addObject}>Add Object</button>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEndpoint;
