import React, { useEffect, useState } from "react"
import { from } from "rxjs"
import styled from "styled-components"
import uniqid from "uniqid"
import { loading$, searchedUsers$, searching$, Users$ } from "../../rxjs"
import GitSearchBar from "./GitSearchBar"
import GitUserCard from "./GitUserCard"
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`
const Top = styled.div`
  display: flex;
  justify-content: center;
`
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  max-width: 1440px;
`
const sGitUserSearch = () => {
  const [usersList, setUsersList] = useState([])
  const [usersRender, setUsersRender] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  const newUsers = []
  useEffect(() => {
    loading$.subscribe((v) => setLoading(v))
    searching$.subscribe((v) => {
      setSearching(v)
    })
  }, [])
  useEffect(() => {
    if (searching) {
      searchedUsers$.subscribe((u) => {
        setUsersList(u)
      })
    } else Users$.subscribe((u) => setUsersList(u))
  }, [searching])

  useEffect(() => {
    ;(async () => {
      if (usersList.length) {
        from(usersList)
          .forEach((user) => {
            const { login, avatar_url, html_url } = user
            const id = uniqid()
            const props = { id, login, avatar_url, html_url }
            newUsers.push(<GitUserCard key={id} {...props} id={id} />)
            return <GitUserCard key={id} {...props} id={id} />
          })
          .then(() => {
            setUsersRender(newUsers)
            loading$.next(false)
          })
      } else {
        setUsersRender(usersList)
      }
    })()
  }, [usersList])

  return (
    <Container>
      <Top>
        <GitSearchBar />
      </Top>
      <Bottom>
        {loading && "Loading ...."}
        {(usersRender.length && usersRender) ||
          (!loading && "Type something to find a users")}
      </Bottom>
    </Container>
  )
}

export default GitUserSearch

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
