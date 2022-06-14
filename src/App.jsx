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
  count,
  debounceTime,
  delay,
  distinctUntilChanged,
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
  const [progressWidth, setProgressWidth] = React.useState(0);
  const [displayMsg, setdisplayMsg] = React.useState([]);
  const [handleClick, click$] = useObservableCallback((e$) => e$);
  const requestOne$ = useObservable(() => of("First")).pipe(delay(1000));
  const requestTwo$ = useObservable(() => of("Second")).pipe(delay(1000));
  const requestThree$ = useObservable(() => of("Third")).pipe(delay(1000));
  const requestFour$ = useObservable(() => of("Fourth")).pipe(delay(1000));
  const obs = [requestOne$, requestTwo$, requestThree$, requestFour$];
  const array$ = useObservable(() => from(obs));
  const request$ = useObservable(() => array$.pipe(concatAll()));
  const count$ = useObservable(() => array$.pipe(count()));
  const progress$ = useObservable(() =>
    click$.pipe(
      switchMap(() => request$),
      share()
    )
  );
  const ratio$ = useObservable(() =>
    progress$.pipe(
      scan((acc) => acc + 1, 0),
      withLatestFrom(count$),
      map(([cur, total]) => (100 * cur) / total)
    )
  );
  const clicky$ = useObservable(() => click$.pipe(switchMap(() => ratio$)));
  useSubscription(clicky$, setProgressWidth);
  useSubscription(progress$, (v) => setProgressWidth([...displayMsg, v]));
  return (
    <Container>
      <Progress width={progressWidth} />
      <Button onClick={handleClick}>Load Data</Button>
      {displayMsg}
    </Container>
  );
}
