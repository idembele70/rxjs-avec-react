import React, { useEffect, useRef, useState } from 'react';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, of, pluck, startWith, switchMap, tap } from 'rxjs';
import styled from 'styled-components';
import { loading$, searchedUsers$, Users$ } from '../../rxjs';
const Container = styled.div`
  width: 90vw;
  max-width: 250px;
  height:70px;
  border-radius: 10px;
  background-color: #550202;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputContainer = styled.div`
  width:100%;
  max-width: 212px;
  height: 42px;
  border-radius: 5px;
  position: relative;
`;
const Image = styled.img`
  cursor:pointer;
  position: absolute;
  right: 9px;
  top:8px;
  transform: translateX(-${props => props.transform}px);
  transition: all 200ms linear;
`;
const Input = styled.input`
  background-color: #FFFFFF;
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
  opacity: ${props => props.opacity};
  transition: all 200ms linear;
  ::placeholder {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    color: #C4C4C4;
  }
`;
const GitSearchBar = () => {
  const [search, setSearch] = useState(false);
  const searchEl = useRef(null)
  const setSearchHandler = () => setSearch(!search)
  useEffect(() => {
    const search$ = fromEvent(searchEl.current, "keyup").pipe(
      distinctUntilChanged(),
      debounceTime(500),
      pluck("target", "value")
    )
    combineLatest([search$, Users$]).pipe(
      switchMap(([v, users]) => {
        const pattern = new RegExp(v, "ig")
        const searchedUsers = users.filter(user => user.login.match(pattern))
        if (searchedUsers.length === 0 || !v)
          searchedUsers$.next([])
        else
          searchedUsers$.next(searchedUsers)
        return of(searchedUsers)
      })
    ).subscribe()
  }, [])
  return (
    <Container>
      <InputContainer>
        <Input ref={searchEl} opacity={search ? 1 : 0} placeholder='Search' onChange={()=>loading$.next(true)} onBlur={setSearchHandler} />
        <Image transform={search ? 0 : 178} onClick={setSearchHandler} src={`${process.env.PUBLIC_URL}/icons/searchIcons.png`} />
      </InputContainer>
    </Container>
  )
}



export default GitSearchBar