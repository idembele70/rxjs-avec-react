import {
  useObservable,
  useObservableCallback,
  useObservableGetState,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React, { useState } from "react";
import {
  BehaviorSubject,
  concat,
  concatAll,
  concatMap,
  count,
  debounceTime,
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  EMPTY,
  filter,
  from,
  fromEvent,
  interval,
  map,
  merge,
  mergeAll,
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
  withLatestFrom,
} from "rxjs";
import styled from "styled-components";
const Container = styled.div`
  height: 200vh;
  width: 100vw;
  padding: 5px;
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
  background-color: #00000058;
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
const Figure = styled.div`
  border: 1px solid red;
  width: 90vw;
  margin: 20px auto;
`;
const Progress = styled.div`
  width: ${(props) => props.width}%;
  background-color: ${(props) => (props.width === 100 ? "green" : "aliceblue")};
  height: 21px;
  transition: all 500ms ease;
`;
const Paragraph = styled.p``;
const RightText = styled.p`
  text-align: right;
  width: 190px;
`;
export default function App() {
  const [handleChange, change$] = useObservableCallback((e$) =>
    e$.pipe(
      debounceTime(500),
      distinctUntilKeyChanged((e) => e.target.value),
      share()
    )
  );
  const [isSaving, setIsSaving] = useState(false);
  const saveInProgress$ = useObservable(() =>
    change$.pipe(
      map(() => of("Saving")),
      tap(() => setIsSaving(true))
    )
  );
  const saveCompleted$ = useObservable(() =>
    change$.pipe(
      mergeMap((v) => of(v).pipe(delay(1000))),
      tap(() => setIsSaving(false)),
      filter(() => !isSaving),
      map(() =>
        concat(
          of("saved"),
          timer(1000).pipe(
            map(() => `Last save: ${new Date().toLocaleTimeString()}`)
          )
        )
      )
    )
  );
  const merged$ = useObservable(() =>
    merge(saveCompleted$, saveInProgress$).pipe(switchAll())
  );
  return (
    <Container>
      <Paragraph>Take a note!</Paragraph>
      <Input onChange={handleChange} />
      <RightText>{useObservableState(merged$, "All Changes saved!")}</RightText>
    </Container>
  );
}
