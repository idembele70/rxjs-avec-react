import React from 'react'
import styled from 'styled-components';
import GitSearchBar from './GitSearchBar';
import GitUserCard from './GitUserCard';
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
  const props = {
    id: 1,
    login: "mojombo",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/mojombo"
  }
  return (
    <Container>
      <Top><GitSearchBar /></Top>
      <Bottom>
        {Array(10).fill(1).map((_, idx) => <GitUserCard key={idx} {...props} id={idx} />)}
      </Bottom>
    </Container>
  )
}

export default GitUserSearch

