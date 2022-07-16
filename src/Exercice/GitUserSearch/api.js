import { of } from "rxjs";
import { users } from "../../data";

export const fetchFunc = (text) => {
  let usersFiltered = [];
  if (text)
    usersFiltered = users.filter((user) =>
      user.login.includes(text.toLowerCase())
    );
  return text ? of(usersFiltered) : users;
};
