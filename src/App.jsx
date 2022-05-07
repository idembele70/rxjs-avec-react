import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import GitUserSearch from "./Exercice/GitUserSearch/GitUserSearch";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Displayer = styled.h2`
  font-size: 24px;
  color: ${(props) => props.color};
  border: 2px solid yellow;
  transition: all 350ms ease-in;
  text-align: center;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Button = styled.button`
  padding: 5px;
  margin: auto;
  cursor: pointer;
  display: block;
  color: ${(props) => props.color};
  background-color: #000;
  text-transform: uppercase;
  &:hover {
    color: ${(props) => props.yellow};
  }
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  transition: all 350ms linear;
  outline: none;
  font-size: 1rem;
`;
export default function App() {
  const continueEl = useRef(null);
  const stopEl = useRef(null);
  const inputEl = useRef(null);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <GitUserSearch />
    </Container>
  );
}
