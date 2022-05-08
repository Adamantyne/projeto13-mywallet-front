export default function Form(props) {
  const {userData,setUserData,submitData} = props;

  return (
    <form onSubmit={(event) => submitData(event)}>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={userData.email}
        onChange={(e) => {
          setUserData({ ...userData, email: e.target.value });
        }}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={userData.password}
        required
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
