import styled from "styled-components";

export default function Board(props) {
  const { transactions, balance, updateBalance, deleteTransaction } = props;
  let total = 0;

  return (
    <WhiteBoard>
      {transactions.length === 0 ? (
        <NoTransactions>
          <p>
            Não há registros de <br /> entrada ou saída
          </p>
        </NoTransactions>
      ) : (
        <>
          <Transactions>
            {transactions.map((transaction, index) => {
              const { _id, date, tittle, value, type } = transaction;
              if (type === "in") {
                total += parseFloat(value);
              } else {
                total -= parseFloat(value);
              }
              if (index === transactions.length - 1) {
                updateBalance(total);
              }
              return (
                <GetTransaction
                  deleteTransaction={deleteTransaction}
                  key={_id}
                  id={_id}
                  date={date}
                  tittle={tittle}
                  value={value}
                  type={type}
                />
              );
            })}
          </Transactions>
          <Status color={balance}>
            <p>
              <strong>SALDO</strong>
            </p>
            <p>{balance}</p>
          </Status>
        </>
      )}
    </WhiteBoard>
  );
}

function GetTransaction(props) {
  const { date, tittle, value, type, id, deleteTransaction } = props;
  return (
    <Transaction color={type}>
      <article>
        <p>{date}</p>
        <h2>{tittle}</h2>
      </article>
      <div>
        <p>{value}</p>
        <ion-icon
          onClick={() => deleteTransaction(id)}
          name="close-circle-outline"
        ></ion-icon>
      </div>
    </Transaction>
  );
}

const WhiteBoard = styled.div`
  width: 100%;
  height: 70%;
  overflow: hidden;
  background-color: white;
  margin: 22px 0 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  padding: 23px 11px 11px 11px;
`;
const NoTransactions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
  color: #868686;
`;
const Transactions = styled.section`
  width: 100%;
  height: 43vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => (props.color === "in" ? "green" : "red")};
  article {
    display: flex;
    align-items: center;
    h2 {
      color: #000000;
    }
    p {
      margin-right: 5px;
      color: #c6c6c6;
    }
    display: flex;
  }
  div {
    display: flex;
    align-items: center;
    ion-icon {
      color: #c6c6c6;
      margin-left: 2px;
    }
  }
`;
const Status = styled.div`
  display: flex;
  justify-content: space-between;
  strong {
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }
  p {
    color: ${(props) => (props.color < 0 ? "red" : "green")};
  }
`;
