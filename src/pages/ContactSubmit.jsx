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

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://playground.4geeks.com/contact/agendas/drew/contacts");
      if (!response.ok) throw new Error("Failed to retrieve contacts");
      const data = await response.json();

      dispatch({ type: "set-contact-list", payload: data });
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
      dispatch({ type: "set-contact-list", payload: savedContacts });
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

  // Create a new contact
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
        dispatch({ type: "set-contact-list", payload: [...store.contactList, newContact] });
        localStorage.setItem("contacts", JSON.stringify([...store.contactList, newContact]));

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

  // Update a contact
  const updateContact = async (contactId, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/drew/contacts/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        const updatedContacts = store.contactList.map((contact) =>
          contact.id === contactId ? updatedContact : contact
        );

        dispatch({ type: "set-contact-list", payload: updatedContacts });
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      } else {
        setError("Failed to update contact.");
      }
    } catch (err) {
      setError("Error updating contact.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/drew/contacts/${contactId}`, { method: "DELETE" });

      if (response.ok) {
        const updatedContacts = store.contactList.filter((contact) => contact.id !== contactId);
        dispatch({ type: "set-contact-list", payload: updatedContacts });
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
                <button>Update</button>
              </Link>{" "}
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No contacts available. Please add a new contact.</p>
        )}
      </ul>

      <h2>Add a Contact</h2>
      <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} />
      <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" value={phone} />
      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" value={email} />
      <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" value={address} />
      <button onClick={createContact} disabled={loading}>Submit</button>
    </div>
  );
};
