import React, { useEffect, useState } from "react";
import GitUserCards from "./GitUserCards";

const StateDefault = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(setUsers)

    return () => {};
  }, []);
  return <GitUserCards list={users} />;
};

export default StateDefault;
