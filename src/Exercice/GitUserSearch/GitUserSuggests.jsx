import {
  useObservable,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  catchError,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  EMPTY,
  fromEvent,
  map,
  of,
  startWith,
  switchMap,
  timer,
} from "rxjs";
import { searchTerm$ } from "../../rxjs";
import { fetchFunc } from "./api";
import GitUserCards from "./GitUserCards";
import StateDefault from "./StateDefault";
import StateError from "./StateError";
import StateLoading from "./StateLoading";

const GitUserSuggests = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  useSubscription(searchTerm$, (v) => setSearchTerm(v));
  const status$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(([searchTerm, fetchFunc]) =>
          searchTerm
            ? timer(750).pipe(
                switchMap(() => fetchFunc(searchTerm)),
                map((suggests) => <GitUserCards list={suggests} />),
                catchError(() => of(<StateError />)),
                startWith(<StateLoading child="searching..." />)
              )
            : of(<StateDefault />)
        )
      ),
    [searchTerm, fetchFunc]
  );
  return useObservableState(status$, () => <StateDefault />);
};

export default GitUserSuggests;
