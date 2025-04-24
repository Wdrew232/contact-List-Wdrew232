import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getData = async () => {
    try {
      const resp = await fetch(
        "https://playground.4geeks.com/contact/agendas/drew/contacts"
      );
      console.log("Response: ", resp);
      if (!resp.ok) {
        await createAgenda();
      }
      const data = await resp.json();
      console.log("Get Data: ", data);
      // Dispatch data to global state
      dispatch({ type: "SET_CONTACTS", payload: data });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const createAgenda = async (slug = "username") => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: slug,
          id: 0,
        }),
      };
      const resp = await fetch(
        `https://playground.4geeks.com/contact/agendas/${slug}`,
        options
      );
      if (resp.ok) {
        console.log("Agenda created successfully");
        getData();
      } else {
        console.error("Agenda creation failed");
      }
    } catch (error) {
      console.error("Agenda creation error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
    </div>
  );
};
