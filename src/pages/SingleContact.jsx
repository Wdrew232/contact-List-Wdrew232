import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const SingleContact = () => {
  const { id } = useParams(); // Retrieve the ID from the route
  const { store } = useGlobalReducer(); // Access global state

  const contact = store.contactList.find((item) => item.id === parseInt(id));

  if (!contact) {
    return <h2>Contact Not Found</h2>;
  }

  return (
    <div className="text-center mt-5">
      <h1>{contact.name}</h1>
      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      <p>Address: {contact.address}</p>
    </div>
  );
};
