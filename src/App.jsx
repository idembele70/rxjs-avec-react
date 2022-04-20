import React from "react";
import styled from 'styled-components';
import GitUserSearch from "./Exercice/GitUserSearch/GitUserSearch";
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
  return (
    <Container>
      <Render>
        <GitUserSearch />
      </Render>
    </Container>
  );
}
