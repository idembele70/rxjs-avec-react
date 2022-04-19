import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Error$, mapSource$, numbers$, reject$, source$, sourcePromise$, stringToChar$ } from "./rxjs";
const Container = styled.div`
height: 100vh;
width: 100vw;
`
const Render = styled.h3`
  font-size: 24px;
  text-align: center;
  color: ${props => props.color};
`;
export default function App() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    reject$.subscribe(console.log)
  }, [])
  return (
    <Container>
      <Render>
        {value}
      </Render>
    </Container>
  );
}
