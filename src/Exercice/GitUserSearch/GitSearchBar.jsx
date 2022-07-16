import {
  pluckCurrentTargetValue,
  useObservableCallback,
  useSubscription,
} from "observable-hooks";
import React, { useState } from "react";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  share,
  tap,
} from "rxjs";
import styled from "styled-components";
import { searchTerm$ } from "../../rxjs";
const Container = styled.div`
  width: 90vw;
  max-width: 250px;
  height: 70px;
  border-radius: 10px;
  background-color: #550202;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputContainer = styled.div`
  width: 100%;
  max-width: 212px;
  height: 42px;
  border-radius: 5px;
  position: relative;
`;
const Image = styled.img`
  cursor: pointer;
  position: absolute;
  right: 9px;
  top: 8px;
  transform: translateX(-${(props) => props.transform}px);
  transition: all 200ms linear;
`;
const Input = styled.input`
  background-color: #ffffff;
  width: 100%;
  padding: 0;
  border: 0;
  height: 100%;
  outline: 0;
  box-sizing: border-box;
  padding-left: 13px;
  padding-top: 9px;
  padding-bottom: 9px;
  line-height: 24px;
  font-size: 20px;
  opacity: ${(props) => props.opacity};
  transition: all 200ms linear;
  cursor: ${(props) => (props.opacity ? "text" : "default")};
  ::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    color: #c4c4c4;
  }
`;
const GitSearchBar = () => {
  const [search, setSearch] = useState(false);
  const [handleSearch, textChange$] = useObservableCallback((e$) =>
    e$.pipe(debounceTime(200), pluck("target", "value"), distinctUntilChanged())
  );
  const setSearchHandler = (e) => {
    e.preventDefault();
    setSearch(!search);
  };
  useSubscription(textChange$, (v) => {
    searchTerm$.next(v);
  });
  return (
    <Container>
      <InputContainer>
        <Input
          opacity={search ? 1 : 0}
          placeholder="Search"
          onChange={handleSearch}
          onBlur={setSearchHandler}
        />
        <Image
          transform={search ? 0 : 178}
          onClick={setSearchHandler}
          src={`${process.env.PUBLIC_URL}/icons/searchIcons.png`}
        />
      </InputContainer>
    </Container>
  );
};

export default GitSearchBar;
