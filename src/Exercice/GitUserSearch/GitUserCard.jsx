import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  min-height: 175px;
  width: 95vw;
  max-width: 350px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 4px 75px rgba(0, 0, 0, 0.25);
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  max-width: 175px;
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
`;
const Right = styled.div`
  flex: 1;
  padding: 6px;
`;
const Title = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  text-align: center;
  margin: 5px 0;
`;
const Id = styled.h5`
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
  margin: 5px 0;
`;

const IconLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  margin: 0 auto;
`;
const Icon = styled.img``;
const GitUserCard = (props) => {
  console.log("render");
  const { id, login, avatar_url, html_url } = props;
  return (
    <Container>
      <Left bgUrl={avatar_url} />
      <Right>
        <Title>Name: {login}</Title>
        <Id>Id: {id}</Id>
        <IconLink href={html_url}>
          <Icon src={`${process.env.PUBLIC_URL}/icons/gitHubIcon.png`} />
        </IconLink>
      </Right>
    </Container>
  );
};

GitUserCard.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
};

export default React.memo(GitUserCard);
