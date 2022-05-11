import react from "react";

const context = react.createContext();

export function Provider(props) {
  const [globalData, setGlobalData] = react.useState({
    name:"",
    email:"",
    token: "",
    url: "https://mywalletdriven13.herokuapp.com/",
  });

  return (
    <context.Provider value={{ globalData, setGlobalData }}>
      {props.children}
    </context.Provider>
  );
}
export const getContext = () => react.useContext(context);
