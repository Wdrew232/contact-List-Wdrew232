import { useState } from "react";

export const ContactSubmit = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const Submit = () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        address: address,
      }),
    };

    fetch("https://playground.4geeks.com/contact/username/contacts", option)
      .then((resp) => resp.json()) 
      .then((data) => console.log("Contact created:", data))
  };

  return (
    <div>
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
    </div>
  );
};
