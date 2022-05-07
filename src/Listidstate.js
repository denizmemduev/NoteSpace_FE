import React, { useState, createContext, useEffect } from "react";

export const listidState = createContext();
export const Listidstate = (props) => {
  const [listidstate, setListidstate] = useState(
    JSON.parse(localStorage.getItem("selectedlist")) || {}
  );

  useEffect(() => {
    localStorage.setItem("selectedlist", JSON.stringify(listidstate));
  }, [listidstate]);

  return (
    <listidState.Provider value={[listidstate, setListidstate]}>
      {props.children}
    </listidState.Provider>
  );
};
