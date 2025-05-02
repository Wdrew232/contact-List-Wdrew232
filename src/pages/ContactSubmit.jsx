import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactSubmit = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState(store.singleContact?.name || "");
  const [phone, setPhone] = useState(store.singleContact?.phone || "");
  const [email, setEmail] = useState(store.singleContact?.email || "");
  const [address, setAddress] = useState(store.singleContact?.address || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async (url, options = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      setError("");
      return await response.json();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitData = async (url, method, payload) => {
    return await handleFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const validateForm = () => {
    if (!name || !phone || !email || !address) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const Submit = async () => {
    if (!validateForm()) return;

    const payload = { name, phone, email, address };
    const data = await submitData(
      "https://playground.4geeks.com/contact/agendas/username/contacts",
      "POST",
      payload
    );

    if (data) {
      dispatch({
        type: "set-contact-list",
        payload: Array.isArray(store.contactList)
          ? [...store.contactList, data]
          : [data],
      });
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Contact List</h2>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <ul>
        {store?.contactList?.length > 0 ? (
          store.contactList.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contact/${contact.id}`}>{contact.name}</Link>
              {" "}
              <Link to={`/update-contact/${contact.id}`}>Update</Link>
            </li>
          ))
        ) : (
          <p>No contacts available. Please add a new contact.</p>
        )}
      </ul>

      <h2>Add a Contact</h2>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        value={name}
      />
      <input
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Phone"
        value={phone}
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        value={email}
      />
      <input
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="Address"
        value={address}
      />
      <button onClick={Submit} disabled={loading}>
        Submit
      </button>
    </div>
  );
};
