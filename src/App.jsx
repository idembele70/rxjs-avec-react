import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GitSearchedUser from "./Exercice/GitUserSearch/GitSearchedUser";
import GitUserSearch from "./Exercice/GitUserSearch/GitUserSearch";
const Container = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  padding: 5px;
  box-sizing: border-box;
`;
export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GitUserSearch />} />
          <Route path="/search" element={<GitSearchedUser />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
