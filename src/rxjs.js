import { BehaviorSubject, catchError, from, map, merge, mergeMap, of, Subject, throwError, timer } from "rxjs";
import { ajax } from "rxjs/ajax";

export const Users$ = new BehaviorSubject([]);
export const loading$ = new Subject();
(() => new Promise(resolve => {
  ajax.getJSON("https://api.github.com/users?per_page=135").pipe(
    map(v => [...v, ...v]),
    catchError(e => of(e))
  ).subscribe(resolve)
})
)().then(usersList => Users$.next(usersList))

const myBadPromise = () => new Promise((resolve, reject) => reject("reject"))

const source$ = timer(1000)

export const reject$ = source$.pipe(
  mergeMap(_ =>
    from(new Promise((resolve, reject) => reject("rejected ! "))).pipe(
      catchError(err => of(`Bad Promise: ${err}`))
    )
  )

)