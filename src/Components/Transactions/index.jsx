import styled from "styled-components";
import dayjs from "dayjs";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { getContext } from "../../context";

export default function Transaction() {
  const { globalData, setGlobalData } = getContext();
  const { url, token, email } = globalData;
  const { status } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: email,
    date: dayjs().format("DD/MM"),
    tittle: "",
    value: "",
    type: "",
  });

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("storageData"));
    if (status === "entrada") {
      setUserData({ ...userData, type: "in" });
    } else {
      setUserData({ ...userData, type: "out" });
    }
    if (!token) {
      setGlobalData(storageData);
      setUserData({ ...userData, email: storageData.email });
    }
  }, [globalData]);

  async function submitData(event) {
    event.preventDefault();
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Email: email,
        }
  };
  try {
    await axios.post(`${url}transactions`,userData,config);
    navigate("/home");
  } catch (e) {
    alert(e.response.data);
  }
  };

  return (
    <Container>
      <h1>Nova {status}</h1>
      <form onSubmit={(event) => submitData(event)}>
        <input
          type="number"
          name="value"
          placeholder="Valor"
          value={userData.value}
          onChange={(e) => {
            setUserData({ ...userData, value: e.target.value });
          }}
          required
        />
        <input
          type="text"
          name="tittle"
          placeholder="Descrição"
          value={userData.tittle}
          onChange={(e) => {
            setUserData({ ...userData, tittle: e.target.value });
          }}
          required
        />
        <button type="submit">Salvar {status}</button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 25px;
  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    margin-bottom: 40px;
  }
  input {
    width: 100%;
    height: 58px;
    margin-bottom: 13px;
    padding: 0 15px 0 15px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }
  button {
    width: 326px;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }
`;
