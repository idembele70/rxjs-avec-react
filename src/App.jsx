import styled from "styled-components";
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
      <GitUserSearch />
    </Container>
  );
}
