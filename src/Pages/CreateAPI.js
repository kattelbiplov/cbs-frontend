import React, { useState } from "react";
import "../Styles/PageStyles/CreateAPI.css";

const getInitialFormFields = () => {
  const authTypes = [
    {
      name: "Basic Auth",
      payload: { username: "", password: "" }
    },
    {
      name: "Bearer Token",
      payload: { token: "" }
    },
    {
      name: "API Key",
      payload: { apikey: "" }
    },
    {
      name: "OAuth 2.0",
      payload: { accessToken: "", refreshToken: "" }
    },
    {
      name: "JWT",
      payload: { jwt: "" }
    }
  ];

  const initialFields = {};
  authTypes.forEach((authType) => {
    Object.assign(initialFields, authType.payload);
  });
  return initialFields;
};

const CreateAPI = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_url: "",
    auth: "",
    ...getInitialFormFields()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, base_url, auth, ...authentication } = formData;
    const formattedData = {
      name,
      description,
      base_url,
      auth,
      authentication: Object.keys(authentication)
        .filter((key) => authentication[key] !== "")
        .reduce((obj, key) => {
          obj[key] = authentication[key];
          return obj;
        }, {})
    };
    console.log("Formatted data:", formattedData);
  };

  const renderAuthFields = () => {
    if (formData.auth) {
      const authTypes = [
        { name: "Basic Auth", payload: { username: "Username", password: "Password" } },
        { name: "Bearer Token", payload: { token: "Token" } },
        { name: "API Key", payload: { apikey: "API Key" } },
        { name: "OAuth 2.0", payload: { accessToken: "Access Token", refreshToken: "Refresh Token" } },
        { name: "JWT", payload: { jwt: "JWT" } }
      ];
      const selectedAuthType = authTypes.find((type) => type.name === formData.auth);
      return Object.keys(selectedAuthType.payload).map((key) => (
        <div key={key} className="form-field">
          <label htmlFor={key}>{selectedAuthType.payload[key]}:</label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ));
    }
    return null;
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create a new API</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="base_url">Base URL:</label>
          <input
            type="text"
            id="base_url"
            name="base_url"
            value={formData.base_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="auth">Auth:</label>
          <select
            id="auth"
            name="auth"
            value={formData.auth}
            onChange={handleChange}
          >
            <option value="">Select Auth Type</option>
            <option value="Basic Auth">Basic Auth</option>
            <option value="Bearer Token">Bearer Token</option>
            <option value="API Key">API Key</option>
            <option value="OAuth 2.0">OAuth 2.0</option>
            <option value="JWT">JWT</option>
          </select>
        </div>
        {renderAuthFields()}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateAPI;
