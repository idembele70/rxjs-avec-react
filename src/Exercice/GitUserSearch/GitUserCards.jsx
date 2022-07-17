import { useObservable, useSubscription } from "observable-hooks";
import PropTypes from "prop-types";
import React from "react";
import { fromEvent, map } from "rxjs";
import uniqid from "uniqid";
import GitUserCard from "./GitUserCard";
const GitUserCards = (props) => {
  const [limit, setLimit] = React.useState(0);
  const scroll$ = useObservable(() =>
    fromEvent(document, "scroll").pipe(
      map(() => {
        const { scrollHeight, clientHeight, scrollTop } =
          document.documentElement;
        const scrollMaxHeight = scrollHeight - clientHeight;
        const scrollPosition = Math.round(scrollTop);
        if (scrollMaxHeight <= scrollPosition) return true;
        return false;
      })
    )
  );
  useSubscription(scroll$, (v) => {
    if (v & (limit < props.list.length)) setLimit(limit + 15);
  });
  const [userList, setUserList] = React.useState([]);
  React.useEffect(() => {
    if (props.list.length < 15) setUserList([]);
    const newUsers = props.list.slice(limit, limit + 15).map((user) => {
      const { login, avatar_url, html_url, id } = user;
      const props = { login, avatar_url, html_url };
      const idx = uniqid();
      return <GitUserCard key={idx} {...props} id={`${idx}`} />;
    });
    setUserList((oldUsers) => {
      return [...oldUsers, ...newUsers];
    });
    return () => {};
  }, [limit, props]);
  return userList;
};
GitUserCards.propTypes = {
  list: PropTypes.array.isRequired,
};

export default GitUserCards;
