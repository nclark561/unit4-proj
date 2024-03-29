import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const authCtx = useContext(AuthContext)

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let body = {username, password}

    console.log(body)

    axios.post(register ? `/register` : `/login`, body)
            .then(res => {
              //@ts-ignore
              authCtx.login(res.data.token, res.data.exp, res.data.id)
              console.log(res)
            })
            .catch(err => {
              console.log(err)
              alert(err.response.data)
            })
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister((prev) => !prev)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
