import {
  useObservable,
  useObservableCallback,
  useObservableGetState,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  BehaviorSubject,
  concat,
  concatAll,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  mergeAll,
  mergeMap,
  of,
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
  const [handleWriteNote, WriteNote$] = useObservableCallback((e$) =>
    e$.pipe(
      debounceTime(500),
      map((e) => e.target.value),
      distinctUntilChanged(),
      share()
    )
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const savingNote$ = useObservable(() =>
    WriteNote$.pipe(
      switchMap(() => of("saving")),
      tap(() => setIsSaving(true))
    )
  );
  const noteSaved$ = useObservable(
    () =>
      WriteNote$.pipe(
        mergeMap((v) => of(v).pipe(delay(2000))),
        tap(() => setIsSaving(false)),
        filter(() => isSaving === false),
        switchMap(() =>
          concat(
            of("saved"),
            EMPTY.pipe(
              startWith(`Last updated: ${new Date().toLocaleTimeString()}`),
              delay(2000)
            )
          )
        )
      ) // waiting for fake data
  );
  const merged$ = useObservable(() => merge(savingNote$, noteSaved$));
  useSubscription(merged$);
  return (
    <Container>
      <Paragraph>Take a note!</Paragraph>
      <Input onChange={handleWriteNote} />
      <RightText>{useObservableState(merged$, "All changes saved")}</RightText>
    </Container>
  );
}
