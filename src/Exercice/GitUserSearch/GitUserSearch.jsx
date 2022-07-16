import React from "react";
import styled from "styled-components";
import GitSearchBar from "./GitSearchBar";
import GitUserSuggests from "./GitUserSuggests";
const Container = styled.div`
  width: 100%;
  max-height: 100%;
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
        <GitUserSuggests />
      </Bottom>
    </Container>
  );
};

export default GitUserSearch;
