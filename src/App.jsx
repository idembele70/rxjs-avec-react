import React, { useEffect } from "react";
import styled from 'styled-components';
import GitUserSearch from "./Exercice/GitUserSearch/GitUserSearch";
import { sourced } from "./rxjs";
const Container = styled.div`
height: 100vh;
width: 100vw;
`
export default function App() {
  return (
    <Container>
      <GitUserSearch />
    </Container>
  );
}
