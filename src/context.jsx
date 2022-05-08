import react from "react";

const context = react.createContext();

export function Provider(props) {
  const [globalData, setGlobalData] = react.useState({
    name:"",
    email:"",
    token: "",
    url: "http://localhost:5000/",
  });

  return (
    <context.Provider value={{ globalData, setGlobalData }}>
      {props.children}
    </context.Provider>
  );
}
export const getContext = () => react.useContext(context);
