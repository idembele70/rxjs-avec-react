import { useObservable, useSubscription } from "observable-hooks";
import React, { useEffect, useState } from "react";
import { fromEvent, map } from "rxjs";
import GitUserCards from "./GitUserCards";
import styled from "styled-components";
const Loader = styled.div`
  width: 100%;
  height: 20px;
  background-color: black;
  color: white;
  text-align: center;
`;
const StateDefault = () => {
  const [limit, setLimit] = React.useState(15);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/users?_limit=${limit}`)
      .then((res) => res.json())
      .then(setUsers)
      .then(() => setLoading(false));
    return () => {};
  }, [limit]);
  const scroll$ = useObservable(() =>
    fromEvent(document, "scroll").pipe(
      map(() => {
        const { scrollHeight, clientHeight, scrollTop } =
          document.documentElement;
        const scrollMaxHeight = scrollHeight - clientHeight;
        const scrollPosition = Math.round(scrollTop);
        if (scrollMaxHeight <= scrollPosition) {
          setLoading(true);
          return true;
        }
      })
    )
  );
  useSubscription(scroll$, (v) => {
    if (v) {
      setLimit(limit + 15);
    }
  });
  return (
    <>
      <GitUserCards list={users} />
      {loading && <Loader>loading...</Loader>}
    </>
  );
};

export default StateDefault;
