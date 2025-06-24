import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactSubmit = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://playground.4geeks.com/contact/agendas/drew");
      if (!response.ok) throw new Error("Failed to retrieve contacts");
      const data = await response.json();
      dispatch({ type: "SET_CONTACTS", payload: data });
      localStorage.setItem("contacts", JSON.stringify(data));
    } catch (err) {
      setError("Error fetching contacts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts && savedContacts.length) {
      dispatch({ type: "SET_CONTACTS", payload: savedContacts });
    } else {
      fetchContacts();
    }
  }, [dispatch]);

  const validateForm = () => {
    if (!name || !phone || !email || !address) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const createContact = async () => {
    if (!validateForm()) return;

    const payload = { name, phone, email, address };
    try {
      setLoading(true);
      const response = await fetch("https://playground.4geeks.com/contact/agendas/drew/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newContact = await response.json();
        const updatedList = [...store.contactList, newContact];
        dispatch({ type: "SET_CONTACTS", payload: updatedList });
        localStorage.setItem("contacts", JSON.stringify(updatedList));
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
      } else {
        setError("Failed to save contact.");
      }
    } catch (err) {
      setError("Error creating contact.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/drew/contacts/${contactId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const updatedContacts = store.contactList.filter((c) => c.id !== contactId);
        dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      } else {
        setError("Failed to delete contact.");
      }
    } catch (err) {
      setError("Error deleting contact.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Contact List</h2>

      {loading && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <ul>
        {store?.contactList?.length > 0 ? (
          store.contactList.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contact/${contact.id}`}>{contact.name}</Link>{" "}
              <Link to={`/update-contact/${contact.id}`}>
                <button className="btn btn-sm btn-warning mx-1">Update</button>
              </Link>{" "}
              <button className="btn btn-sm btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No contacts available. Please add a new contact.</p>
        )}
      </ul>

      <h2 className="mt-4">Add a Contact</h2>
      <input className="form-control my-2" onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} />
      <input className="form-control my-2" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" value={phone} />
      <input className="form-control my-2" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" value={email} />
      <input className="form-control my-2" onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" value={address} />
      <button className="btn btn-success mt-2" onClick={createContact} disabled={loading}>Submit</button>
    </div>
  );
};
