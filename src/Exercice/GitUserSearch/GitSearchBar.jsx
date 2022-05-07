import React, { useEffect, useRef, useState } from "react";
import {
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  endWith,
  filter,
  finalize,
  from,
  fromEvent,
  map,
  of,
  pluck,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import styled from "styled-components";
import {
  loading$,
  searchedTerm$,
  searchedUsers$,
  searching$,
  Users$,
} from "../../rxjs";
import GitUserSearch from "./GitUserSearch";
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
  ::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    color: #c4c4c4;
  }
`;
const GitSearchBar = () => {
  const [search, setSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const setSearchHandler = () => {
    setSearch(!search);
    searching$.next(false);
  };
  const searchEl = useRef(null);
  useEffect(() => {
    const newUsers = [];
    const searchEv = fromEvent(searchEl.current, "input")
      .pipe(
        tap(() => loading$.next(true)),
        pluck("target", "value"),
        debounceTime(500),
        distinctUntilChanged(),
        concatMap(() =>
          of(
            loading$.next(true),
            tap(() => searchedUsers$.next([]))
          )
        ),
        filter((v) => v.length),
        withLatestFrom(Users$),
        switchMap(([searchTerm, users]) => {
          return from(users).pipe(
            filter((u) => u.login.toLowerCase().includes(searchTerm))
          );
        }),
        tap(() => loading$.next(false))
      )
      .subscribe();
    return () => {
      searchEv.unsubscribe();
    };
  }, []);
  useEffect(() => {
    //combineLatest([searchedTerm$, Users$])
    //  .pipe(
    //    switchMap(([v, users]) => {
    //      const pattern = new RegExp(v, "ig")
    //      const searchedUsers = users.filter((user) =>
    //        user.login.match(pattern)
    //      )
    //      if (searchedUsers.length === 0 || !v) searchedUsers$.next([])
    //      else searchedUsers$.next(searchedUsers)
    //      return of(searchedUsers)
    //    })
    //  )
    //  .subscribe()
  }, []);
  return (
    <Container>
      <InputContainer>
        <Input
          ref={searchEl}
          opacity={search ? 1 : 0}
          placeholder="Search"
          onFocus={() => searching$.next(true)}
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
