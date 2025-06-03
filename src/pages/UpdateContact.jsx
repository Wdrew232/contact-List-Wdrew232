import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const UpdateContact = () => {
  const { id } = useParams(); // Retrieve the contact ID from the route
  const { store, dispatch } = useGlobalReducer(); // Access global state
  const navigate = useNavigate(); // To redirect after updating

  // Locate the contact details based on the ID
  const contact = store.contactList.find((item) => String(item.id) === String(id));

  // State for form fields
  const [name, setName] = useState(contact?.name || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [address, setAddress] = useState(contact?.address || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setPhone(contact.phone || "");
      setEmail(contact.email || "");
      setAddress(contact.address || "");
    }
  }, [contact]);

  const validateForm = () => {
    if (!name || !phone || !email || !address) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
      setError("Invalid contact ID.");
      return;
    }

    const payload = { name, phone, email, address };
    console.log("Updating Contact ID:", contactId);
    console.log("Payload:", payload);

    try {
      setLoading(true);
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/drew/contacts/${contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Update failed: ${response.status} - ${errorMessage}`);
        setError(`Failed to update: ${errorMessage}`);
        return;
      }

      const updatedContact = await response.json();
      console.log("Update response:", updatedContact);

      // ✅ Update global state
      const updatedContacts = store.contactList.map((contact) =>
        contact.id === contactId ? updatedContact : contact
      );
      dispatch({ type: "set-contact-list", payload: updatedContacts });

      // ✅ Ensure localStorage updates
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      console.log("Contacts saved in localStorage:", updatedContacts);

      navigate("/contacts"); // ✅ Redirect after update
    } catch (err) {
      setError(`Error updating contact: ${err.message}`);
      console.error("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };




  if (!contact) {
    return <h2>Contact Not Found</h2>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Update Contact: {contact.name}</h1>
      {error && <p className="text-danger">{error}</p>}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" value={phone} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" value={email} />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input id="address" onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" value={address} />
      </div>
      <button onClick={handleUpdate} disabled={loading}>Update Contact</button>
    </div>
  );
};
