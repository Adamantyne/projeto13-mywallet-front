import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationScreen from "./RegistrationScreen/index.jsx";
import LoginScreen from "./LoginScreen/index.jsx";
import HomeScreen from "./HomeScreen/index.jsx";
import Transaction from "./Transactions/index.jsx";
import { Provider } from "../context";

export default function App() {
  return (
    <Main>
      <Provider>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/registration" element={<RegistrationScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/transaction/:status" element={<Transaction />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Provider>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100%;
  min-width: 334px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #8c21be;
`;
const Container = styled.div`
  width: 326px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


