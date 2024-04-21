import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceHandler = createContext();
export const ServiceHandlerProvider = ({ children }) => {
  const initialPostRoom = sessionStorage.getItem("postRoom") === "true";
  const initialBuyRoom = sessionStorage.getItem("buyRoom") === "true";
  const initialCityName = sessionStorage.getItem("newCityName") || "";

  const [postRoom, setPostRoom] = useState(initialPostRoom);
  const [buyRoom, setBuyRoom] = useState(initialBuyRoom);
  const [newCityName, setNewCityName] = useState(initialCityName);

  const checkTokenAndResetStates = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setPostRoom(initialPostRoom);
      setBuyRoom(initialBuyRoom);
      setNewCityName(initialCityName);
    }
  };

  useEffect(() => {
    checkTokenAndResetStates();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("postRoom", postRoom);
  }, [postRoom]);

  useEffect(() => {
    sessionStorage.setItem("buyRoom", buyRoom);
  }, [buyRoom]);

  useEffect(() => {
    sessionStorage.setItem("newCityName", newCityName);
  }, [newCityName]);

  return (
    <ServiceHandler.Provider
      value={{
        postRoom,
        setPostRoom,
        buyRoom,
        setBuyRoom,
        newCityName,
        setNewCityName,
      }}
    >
      {children}
    </ServiceHandler.Provider>
  );
};

export const useService = () => useContext(ServiceHandler);
