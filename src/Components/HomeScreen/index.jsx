import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { getContext } from "../../context";
import Board from "./WhiteBoard";

export default function HomeScreen() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const { globalData, setGlobalData } = getContext();
  const { url, token, email, name } = globalData;
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Email: email,
    },
  };

  function leftAccount() {
    setGlobalData({
      name: "",
      email: "",
      token: "",
      url: "http://localhost:5000/",
    });
    navigate("/");
  }

  function updateBalance(total){
    setTimeout(()=>setBalance(total),100)
  }

  useEffect(() => {
    const storageData = localStorage.getItem("storageData");
    if (token) {
      localStorage.setItem("storageData", JSON.stringify(globalData));
      getTransactions();
    } else {
      setGlobalData(JSON.parse(storageData));
    }
  }, [globalData]);

  async function getTransactions() {
    try {
      const getList = await axios.get(`${url}transactions`, config);
      setTransactions(getList.data);
    } catch (e) {
      alert(e.response.data);
    }
  }

  async function deleteTransaction(id){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Email: email,
        id:id
      },
    };
    try {
      await axios.delete(`${url}transactions`,config);
      getTransactions();
    } catch (e) {
      alert(e.response.data);
    }
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <ion-icon onClick={() => leftAccount()} name="exit-outline"></ion-icon>
      </Header>
      <Board
        transactions={transactions}
        updateBalance={updateBalance}
        balance={balance}
        deleteTransaction={deleteTransaction}
      />
      <Options>
        <Link to={"/transaction/entrada"}>
          <GetOptions icon="add-circle-outline" text="Nova entrada" />
        </Link>
        <Link to={"/transaction/saída"}>
          <GetOptions icon="remove-circle-outline" text="Nova saída" />
        </Link>
      </Options>
    </HomeContainer>
  );
}

function GetOptions(props) {
  const { icon, text } = props;
  return (
    <Option>
      <ion-icon name={icon}></ion-icon>
      <p>{text}</p>
    </Option>
  );
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 25px 0 16px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
  ion-icon {
    color: #ffffff;
    font-size: 24px;
  }
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
  ion-icon {
    color: #ffffff;
    font-size: 22px;
  }
`;
const Option = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: #a328d6;
  width: 156px;
  height: 114px;
  border-radius: 5px;
`;
