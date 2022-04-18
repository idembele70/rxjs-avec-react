import { interval, of, tap } from "rxjs";

export const sourced = of(
  { name: "Brian" },
  [1, 2, 3],
  function hello() {
    return "Hello"
  }
).subscribe(console.log).unsubscribe()