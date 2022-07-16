import {
  useObservable,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import React from "react";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  startWith,
  switchMap,
  tap,
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
  const [limit, setLimit] = React.useState(15);
  useSubscription(searchTerm$, (v) => setSearchTerm(v));
  const status$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(([searchTerm, fetchFunc, limit]) =>
          searchTerm
            ? timer(750).pipe(
                switchMap(() => fetchFunc(searchTerm, limit)),
                map((suggests) => <GitUserCards list={suggests} />),
                catchError(() => of(<StateError />))
              )
            : of(<StateDefault />)
        )
      ),
    [searchTerm, fetchFunc, limit]
  );
  const [loading, setLoading] = React.useState(false);
  const scroll$ = useObservable(() =>
    fromEvent(document, "scroll").pipe(
      map(() => {
        const { scrollHeight, clientHeight, scrollTop } =
          document.documentElement;
        const scrollMaxHeight = scrollHeight - clientHeight;
        const scrollPosition = Math.round(scrollTop);
        if (scrollMaxHeight <= scrollPosition) {
          setLoading(true);
          return true;
        }
      })
    )
  );
  useSubscription(scroll$, (v) => {
    if (v) {
      setLimit(limit + 15);
    }
  });
  return useObservableState(status$, () => <StateDefault />);
};

export default GitUserSuggests;
