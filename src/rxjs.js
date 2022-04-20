import { BehaviorSubject, catchError, from, map, merge, mergeMap, of, Subject, throwError, timer } from "rxjs";
import { ajax } from "rxjs/ajax";

export const Users$ = new BehaviorSubject([]);
export const loading$ = new Subject();
export const searchedUsers$ = new BehaviorSubject([]);
(() => new Promise(resolve => {
  ajax.getJSON("https://api.github.com/users?per_page=135").pipe(
    map(v => [...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v, ...v]),
    catchError(e => of(e))
  ).subscribe(resolve)
})
)().then(usersList => Users$.next(usersList))