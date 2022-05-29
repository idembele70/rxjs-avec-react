import {
  useObservable,
  useObservableCallback,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  concat,
  debounceTime,
  defer,
  delay,
  distinctUntilChanged,
  EMPTY,
  filter,
  interval,
  map,
  merge,
  mergeMap,
  of,
  pluck,
  scan,
  share,
  startWith,
  switchAll,
  switchMap,
  tap,
  timer,
} from "rxjs";
import styled from "styled-components";
const Container = styled.div`
  height: 200vh;
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
  background-color: black;
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
  const [isSaving, setIsSaving] = React.useState("All changes saved");
  const saveChange = (v) => of(v).pipe(delay(1500));
  const [handleChange, input$] = useObservableCallback((e$) =>
    e$.pipe(
      debounceTime(500),
      pluck("target", "value"),
      distinctUntilChanged(),
      share()
    )
  );
  const saving$ = useObservable(() =>
    input$.pipe(
      map(() => of("Saving")),
      tap(() => setIsSaving(true))
    )
  );
  const saved$ = useObservable(() =>
    input$.pipe(
      mergeMap(saveChange),
      tap(() => setIsSaving(false)),
      filter(() => !isSaving),
      map(() =>
        concat(of("Saved!"), timer(3000)).pipe(
          map(() => `Last updated: ${Date.now()}`)
        )
      )
    )
  );
  const merged$ = useObservable(() => merge(saving$, saved$).pipe(switchAll()));
  const msg = useObservableState(merged$, "All changes saved");
  React.useEffect(() => {}, []);
  return (
    <Container>
      <Displayer>Take a note!</Displayer>
      <Input onChange={handleChange} />
      <Displayer>{msg}</Displayer>
    </Container>
  );
}
