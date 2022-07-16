import { BehaviorSubject, catchError, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

// const biggestData = [
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
//   ...v,
// ]
export const Users$ = new BehaviorSubject([]);
export const loading$ = new BehaviorSubject(true);
export const searching$ = new BehaviorSubject(false);
export const searchedUsers$ = new BehaviorSubject([]);
export const dataLength$ = new BehaviorSubject(0);
(() =>
  new Promise((resolve) => {
    ajax
      .getJSON("https://api.github.com/users?per_page=135")
      .pipe(
        map((v) => v),
        catchError((e) => of(e))
      )
      .subscribe(resolve);
  }))().then((usersList) => Users$.next(usersList));

// DO NOT TOUCH TOP !

export const searchTerm$ = new BehaviorSubject("");

// DO NOT TOUCH TO TOP !!!!
