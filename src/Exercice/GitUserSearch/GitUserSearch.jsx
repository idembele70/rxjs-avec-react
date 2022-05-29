import React from "react";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";
import { usersRender } from "./api";
import GitSearchBar from "./GitSearchBar";
import GitUserSuggests from "./GitUserSuggests";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const Top = styled.div`
  display: flex;
  justify-content: center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  max-width: 1440px;
`;

const GitUserSearch = () => {
  React.useEffect(() => {
    return () => {};
  }, []);
  return (
    <Container>
      <Top>
        <GitSearchBar />
      </Top>
      <Bottom>
        <List itemCount={135} itemSize={168} height={768} width={900}>
          <GitUserSuggests />
        </List>
      </Bottom>
    </Container>
  );
};

export default GitUserSearch;

/* 
setUsersRender(
          usersList.map((user) => {
            const { login, avatar_url, html_url } = user;
            const id = uniqid();
            const props = { id, login, avatar_url, html_url };
            return <GitUserCard key={id} {...props} id={id} />;
          })
        )
*/
