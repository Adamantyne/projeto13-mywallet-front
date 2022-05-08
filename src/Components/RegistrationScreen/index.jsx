import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getContext } from "../../context";
import Form from "./RegistrationForm";

export default function RegistrationScreen() {
  const navigate = useNavigate();
  const url = getContext().globalData.url;
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  async function submitData(event) {
    event.preventDefault();
    if (userData.password !== userData.repeatPassword) {
      return alert("Repita a senha corretamente");
    }
    try {
      const result = await axios.post(`${url}signOn`, userData);
      console.log(result.data);
      navigate("/");
    } catch (e) {
      alert(e.response.data);
    }
  }

  return (
    <RegistrationContainer>
      <h1>MyWallet</h1>
      <Form
        submitData={submitData}
        userData={userData}
        setUserData={setUserData}
      />
      <Link to={"/"}>
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </RegistrationContainer>
  );
}
const RegistrationContainer = styled.div`
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
    margin-bottom: 28px;
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
    margin-bottom: 32px;
  }
  p {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;
