import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import GitUserCard from "./GitUserCard";
const GitUserCards = (props) => {
  return props.list.map((user) => {
    const { login, avatar_url, html_url } = user;
    const id = uniqid();
    const props = { id, login, avatar_url, html_url };
    return <GitUserCard key={id} {...props} id={id} />;
  });
};

GitUserCards.propTypes = {
  list: PropTypes.array.isRequired,
};

export default GitUserCards;
