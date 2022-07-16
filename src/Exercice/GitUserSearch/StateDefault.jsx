import { useObservable, useSubscription } from "observable-hooks";
import React, { useEffect, useState } from "react";
import { fromEvent, map } from "rxjs";
import GitUserCards from "./GitUserCards";
import styled from "styled-components";
import StateLoading from "./StateLoading";
import { fetchFunc } from "./api";
const LoaderContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loader = styled.h5`
  padding: 20px 40px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 1.5em;
`;
const StateDefault = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    // Adding Timeout just for better user experience with the loader
    setTimeout(() => {
      setUsers(fetchFunc());
      setLoading(false);
    }, 1500);
    return () => {};
  }, []);

  return (
    <>
      <GitUserCards list={users} />
      {loading && <StateLoading child="Loading..." />}
    </>
  );
};

export default StateDefault;
