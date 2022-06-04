import {
  useObservable,
  useObservableCallback,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  combineLatest,
  concat,
  concatAll,
  concatMap,
  count,
  delay,
  EMPTY,
  endWith,
  filter,
  from,
  interval,
  map,
  mergeMap,
  of,
  scan,
  share,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
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
export default function App() {
  const [message, setMessage] = React.useState(null);
  const source$ = useObservable(() =>
    interval(1000).pipe(filter((v) => v % 2 === 0))
  );
  const evenNumberCount$ = useObservable(() =>
    source$.pipe(scan((acc) => acc + 1, 0))
  );
  const firstFiveEvenNum$ = useObservable(() =>
    evenNumberCount$.pipe(filter((v) => v > 1))
  );
  const combined$ = useObservable(() =>
    source$.pipe(
      withLatestFrom(evenNumberCount$),
      map(([value, count]) => `Count: ${count} value : ${value}`),
      takeUntil(firstFiveEvenNum$),
      endWith("Finished")
    )
  );
  useSubscription(combined$, (v) => {
    if (v === "Finished") setMessage(v);
    else console.log(v);
  });
  return <Container>{message}</Container>;
}
