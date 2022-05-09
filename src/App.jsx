import {
  pluckCurrentTargetChecked,
  useObservableCallback,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  interval,
  map,
  mergeMap,
  of,
  pluck,
  scan,
  tap,
} from "rxjs";
import styled from "styled-components";

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
  const [onChange, textChange$] = useObservableCallback((e$) =>
    e$.pipe(pluck("target", "value"), debounceTime(500), distinctUntilChanged())
  );
  useSubscription(textChange$, (v) => console.log(v));
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <Input onChange={onChange} />
    </Container>
  );
}
