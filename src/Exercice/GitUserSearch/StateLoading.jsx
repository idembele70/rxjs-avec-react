import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoaderContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loader = styled.h5`
  padding: 20px 40px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 1.5em;
`;

const StateLoading = ({ child }) => (
  <LoaderContainer>
    <Loader>{child}</Loader>
  </LoaderContainer>
);

StateLoading.propTypes = {
  child: PropTypes.string.isRequired,
};

export default StateLoading;
