import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactSubmit = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState(store.singleContact?.name || "");
  const [phone, setPhone] = useState(store.singleContact?.phone || "");
  const [email, setEmail] = useState(store.singleContact?.email || "");
  const [address, setAddress] = useState(store.singleContact?.address || "");


  const Submit = () => {
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, address }),
    };

    fetch("https://playground.4geeks.com/contact/agendas/username/contacts", opt)
      .then((resp) => {
        if (!resp.ok) throw new Error("Failed to create contact");
        return resp.json();
      })
      .then((data) => {
        
        dispatch({
          type: "set-contact-list",
          payload: [...store.contactList, data],
        });
        console.log("Contact created:", data);

        
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
      })
      
  };

  
  const updateSubmit = (id) => {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, address }),
    };

    fetch(`https://playground.4geeks.com/contact/agendas/username/contacts/${id}`, option)
      .then((resp) => {
        if (!resp.ok) throw new Error("Failed to update contact");
        return resp.json();
      })
      .then((data) => {
        console.log("Contact updated:", data);
        getData(); 
      })
      
  };


  const getData = () => {
    fetch("https://playground.4geeks.com/contact/agendas/username/contacts")
      .then((resp) => {
        if (!resp.ok) throw new Error("Failed to fetch contacts");
        return resp.json();
      })
      .then((data) => {
        dispatch({
          type: "set-contact-list",
          payload: data,
        });
      })
      
  };

  
  useEffect(() => {
    getData();
  }, []);

  
  useEffect(() => {
    dispatch({
      type: "set-single-contact",
      payload: { name, phone, email, address },
    });
  }, [name, phone, email, address]);

  return (
    <div className="text-center mt-5">
      <h2>Contact List</h2>
      <ul>
        {store?.contactList.length > 0 ? (
          store.contactList.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.phone} - {contact.email} - {contact.address}
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
      <button onClick={Submit}>Submit</button>
      <button onClick={() => updateSubmit(store.singleContact.id)}>Update</button>
    </div>
  );
};
