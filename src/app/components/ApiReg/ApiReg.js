'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'; // For decoding JWTs
import styles from './ApiReg.module.css'; // Import the CSS module

function ApiReg() {
  const [api, setApi] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiId, setApiId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [apis, setApis] = useState([]); // List of APIs

  // Fetch API details on component load
  useEffect(() => {
    fetchApiDetails();
  }, []);

  // Fetch API details
  const fetchApiDetails = async () => {
    const query = `
      query GetApis {
        getApis {
          id
          api
          token
        }
      }
    `;

    try {
      setLoading(true); // Start loading
      const response = await fetch('/api/apiregistrationgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (result.data.getApis) {
        // Decode the JWT for each API to get apiKey and apiId
        const apiDetails = result.data.getApis.map((api) => {
          const decoded = jwt.decode(api.token);
          return {
            id: api.id,
            api: api.api,
            apiKey: decoded.apiKey,
            apiId: decoded.apiId,
            showApiKey: false, // Default to hidden
            showApiId: false,  // Default to hidden
            isEditing: false,   // Track if this API is being edited
          };
        });
        setApis(apiDetails); // Store the APIs in a list
        setMessage('API details fetched successfully!');
      } else {
        setMessage('No APIs found.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle API registration
  const handleAddApi = async (e) => {
    e.preventDefault();

    const query = `
      mutation RegisterApi($api: String!, $apiKey: String!, $apiId: String!) {
        registerApi(api: $api, apiKey: $apiKey, apiId: $apiId) {
          id
          api
          token
        }
      }
    `;

    const variables = { api, apiKey, apiId };

    try {
      setLoading(true); // Start loading
      const response = await fetch('/api/apiregistrationgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (result.data.registerApi) {
        setMessage('API saved successfully!');
        // Clear the form
        setApi('');
        setApiKey('');
        setApiId('');
        // Refresh the API list
        fetchApiDetails();
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle API update
  const handleUpdateApi = async (id, updatedApi) => {
    const query = `
      mutation UpdateApi($id: ID!, $api: String!, $apiKey: String!, $apiId: String!) {
        updateApi(id: $id, api: $api, apiKey: $apiKey, apiId: $apiId) {
          id
          api
          token
        }
      }
    `;

    const variables = { id, api: updatedApi.api, apiKey: updatedApi.apiKey, apiId: updatedApi.apiId };

    try {
      setLoading(true); // Start loading
      const response = await fetch('/api/apiregistrationgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (result.data.updateApi) {
        setMessage('API updated successfully!');
        // Refresh the API list
        fetchApiDetails();
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle API deletion
  const handleDelete = async (id) => {
    const query = `
      mutation DeleteApi($id: ID!) {
        deleteApi(id: $id)
      }
    `;

    const variables = { id };

    try {
      setLoading(true); // Start loading
      const response = await fetch('/api/apiregistrationgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (result.data.deleteApi) {
        setMessage('API deleted successfully!');
        // Refresh the API list
        fetchApiDetails();
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Toggle API Key visibility for a specific API
  const toggleApiKeyVisibility = (id) => {
    setApis((prevApis) =>
      prevApis.map((api) =>
        api.id === id ? { ...api, showApiKey: !api.showApiKey } : api
      )
    );
  };

  // Toggle API ID visibility for a specific API
  const toggleApiIdVisibility = (id) => {
    setApis((prevApis) =>
      prevApis.map((api) =>
        api.id === id ? { ...api, showApiId: !api.showApiId } : api
      )
    );
  };

  // Toggle edit mode for a specific API
  const toggleEditMode = (id) => {
    setApis((prevApis) =>
      prevApis.map((api) =>
        api.id === id ? { ...api, isEditing: !api.isEditing } : api
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>API Registration</h1>


      {/* Display messages */}
      {message && <p className={styles.message}>{message}</p>}

      {/* Loading Indicator */}
      {loading && <p className={styles.loading}>Loading...</p>}

      {/* Display API List */}
      <div className={styles.apiList}>
        <h2 className={styles.subtitle}>API List</h2>
        {apis.length > 0 ? (
          <ul className={styles.list}>
            {apis.map((api) => (
              <li key={api.id} className={styles.listItem}>
                {api.isEditing ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateApi(api.id, api);
                      toggleEditMode(api.id); // Exit edit mode after saving
                    }}
                    className={styles.form}
                  >
                    <div className={styles.formGroup}>
                      <label className={styles.label}>API:</label>
                      <input
                        type="text"
                        value={api.api}
                        onChange={(e) =>
                          setApis((prevApis) =>
                            prevApis.map((a) =>
                              a.id === api.id ? { ...a, api: e.target.value } : a
                            )
                          )
                        }
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>API Key:</label>
                      <input
                        type={api.showApiKey ? 'text' : 'password'}
                        value={api.apiKey}
                        onChange={(e) =>
                          setApis((prevApis) =>
                            prevApis.map((a) =>
                              a.id === api.id ? { ...a, apiKey: e.target.value } : a
                            )
                          )
                        }
                        className={styles.input}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => toggleApiKeyVisibility(api.id)}
                        className={styles.toggleButton}
                      >
                        {api.showApiKey ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>API ID:</label>
                      <input
                        type={api.showApiId ? 'text' : 'password'}
                        value={api.apiId}
                        onChange={(e) =>
                          setApis((prevApis) =>
                            prevApis.map((a) =>
                              a.id === api.id ? { ...a, apiId: e.target.value } : a
                            )
                          )
                        }
                        className={styles.input}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => toggleApiIdVisibility(api.id)}
                        className={styles.toggleButton}
                      >
                        {api.showApiId ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <button type="submit" className={styles.button} disabled={loading}>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleEditMode(api.id)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <p><strong>API:</strong> {api.api}</p>
                    <p>
                      <strong>API Key:</strong> {api.showApiKey ? api.apiKey : '••••••••'}
                      <button
                        type="button"
                        onClick={() => toggleApiKeyVisibility(api.id)}
                        className={styles.toggleButton}
                      >
                        {api.showApiKey ? 'Hide' : 'Show'}
                      </button>
                    </p>
                    <p>
                      <strong>API ID:</strong> {api.showApiId ? api.apiId : '••••••••'}
                      <button
                        type="button"
                        onClick={() => toggleApiIdVisibility(api.id)}
                        className={styles.toggleButton}
                      >
                        {api.showApiId ? 'Hide' : 'Show'}
                      </button>
                    </p>
                    <div className={styles.actions}>
                      <button
                        onClick={() => toggleEditMode(api.id)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(api.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No APIs found.</p>
        )}
      </div>
      <h2>Add API</h2>
      {/* Add API Form */}
      <form onSubmit={handleAddApi} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>API:</label>
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>API ID:</label>
          <input
            type="password"
            value={apiId}
            onChange={(e) => setApiId(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          Add API
        </button>
      </form>
    </div>
  );
}

export default ApiReg;