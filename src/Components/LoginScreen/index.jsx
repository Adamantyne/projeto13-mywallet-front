import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getContext } from "../../context";
import Form from "./LoginForm";

export default function LoginScreen() {
  const navigate = useNavigate();
  const globalData = getContext().globalData;
  const setGlobalData = getContext().setGlobalData;
  const url = globalData.url;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  async function submitData(event) {
    event.preventDefault();
    try {
      const result = await axios.post(`${url}signIn`, userData);
      console.log(result.data);
      const { token } = result.data;
      const { email, name } = result.data.user;
      setGlobalData({ ...globalData, token, email, name });
      navigate("/");
    } catch (e) {
      alert(e.response.data);
    }
  }
  return (
    <LoginContainer>
      <h1>MyWallet</h1>
      <Form
        userData={userData}
        setUserData={setUserData}
        submitData={submitData}
      />
      <Link to={"/registration"}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h1 {
    font-family: "Saira Stencil One", cursive;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-bottom: 24px;
  }
  input {
    width: 100%;
    height: 58px;
    border: none;
    background: #ffffff;
    border-radius: 5px;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    padding: 0 15px 0 15px;
    margin-bottom: 13px;
    align-items: center;
  }
  button {
    width: 100%;
    height: 46px;
    border: none;
    background: #a328d6;
    border-radius: 5px;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 36px;
  }
  p {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;
