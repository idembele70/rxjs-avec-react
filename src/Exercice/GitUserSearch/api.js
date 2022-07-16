import { from } from "rxjs";

export const fetchFunc = (text, limit) =>
  from(
    fetch(
      `http://localhost:5000/users?login_like=${text}&_limit=${limit}`
    ).then((t) => t.json())
  );
