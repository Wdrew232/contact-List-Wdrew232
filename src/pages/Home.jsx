import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getData = () => {
    fetch("https://playground.4geeks.com/contact/agendas/drew/contacts")
      .then((resp) => {
        console.log("Response: ", resp);
        if (resp.ok == false) {
          createAgenda();
        }
        return resp.json();
      })
      .then((data) => console.log("Get Data: ", data));
  };

  const createAgenda = () => {
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: "username",
        id: 0,
      }),
    };

    fetch("https://playground.4geeks.com/contact/agendas/username", opt)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("Agenda created! Data: ", data);
        getData();
      });
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
