import React, { useEffect, useId, useInsertionEffect, useState } from 'react'
import styled from 'styled-components';
import { loading$, searchedUsers$, Users$ } from '../../rxjs';
import GitSearchBar from './GitSearchBar';
import GitUserCard from './GitUserCard';
import uniqid from 'uniqid'
import { combineLatest, EMPTY, endWith, pipe, Subject, tap } from 'rxjs';
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
  const [usersList, setUsersList] = useState([]);
  const [usersRender, setUsersRender] = useState([]);
  const [loading, setLoading] = useState(false);
  useInsertionEffect(() => {
    loading$.subscribe(
      v => {
        setLoading(v)
      }
    )
    combineLatest([Users$, searchedUsers$]).subscribe(
      ([users, searchedUsers]) => {
        if (searchedUsers.length)
          setUsersList(searchedUsers)
        else
          setUsersList(users)
      }
    )
  })

  useEffect(() => {
    EMPTY.
      pipe(
        tap(
          setUsersRender(
            usersList.map((user, idx) => {
              const { login, avatar_url, html_url } = user
              const id = uniqid()
              const props = { id, login, avatar_url, html_url }
              return <GitUserCard key={id} {...props} id={id} />
            })
          )
        ),
        endWith(loading$.next(false))
      )

  }, [usersList])
  if (loading) "loading..."
  return (
    <Container>
      <Top><GitSearchBar /></Top>
      <Bottom>
        {loading && "Loading ...."}
        {usersRender}
      </Bottom>
    </Container>
  )
}

export default GitUserSearch

