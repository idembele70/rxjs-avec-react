import { from } from "rxjs";

export const fetchFunc = (text) =>
  from(
    fetch(`http://localhost:5000/users?login_like=${text}`).then((t) =>
      t.json()
    )
  );
