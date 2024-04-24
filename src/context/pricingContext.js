import React, { createContext, useState, useEffect } from "react";

const SelectedCardContext = createContext();

const SelectedCardProvider = ({ children }) => {
  const [selectedCardId, setSelectedCardId] = useState(() => {
    // Get the selectedCardId from localStorage if it exists
    const storedId = localStorage.getItem("selectedCardId");
    return storedId ? JSON.parse(storedId) : null;
  });

  useEffect(() => {
    // Store the selectedCardId in localStorage whenever it changes
    localStorage.setItem("selectedCardId", JSON.stringify(selectedCardId));
  }, [selectedCardId]);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  return (
    <SelectedCardContext.Provider value={{ selectedCardId, handleCardClick }}>
      {children}
    </SelectedCardContext.Provider>
  );
};

export { SelectedCardProvider, SelectedCardContext };
