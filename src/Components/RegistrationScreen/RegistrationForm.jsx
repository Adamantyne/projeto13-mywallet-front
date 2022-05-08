export default function Form(props) {
  const { submitData, userData, setUserData } = props;
  return (
    <form onSubmit={(event) => submitData(event)}>
      <input
        placeholder="Nome"
        type="text"
        name="name"
        value={userData.name}
        required
        onChange={(e) => {
          setUserData({ ...userData, name: e.target.value });
        }}
      />
      <input
        placeholder="E-mail"
        type="email"
        name="email"
        value={userData.email}
        required
        onChange={(e) => {
          setUserData({ ...userData, email: e.target.value });
        }}
      />
      <input
        placeholder="Senha"
        type="password"
        name="password"
        value={userData.password}
        required
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
      />
      <input
        placeholder="Confirme a senha"
        type="password"
        name="repeatPassword"
        value={userData.repeatPassword}
        required
        onChange={(e) => {
          setUserData({ ...userData, repeatPassword: e.target.value });
        }}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
