import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputField } from "../components/inputField";
import { useSubmit } from "../lib/useSubmit";
import { postJson } from "../lib/http";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/login", { username, password });
    },
    () => history.push("/")
  );

  return (
    <div>
      <h2>Login</h2>

      {error && <div>{error.toString()}</div>}
      <form
        // @ts-ignore
        onSubmit={handleSubmit}
      >
        <InputField
          value={username}
          // @ts-ignore
          onValueChange={setUsername}
          label="username"
        />
        <InputField
          value={password}
          // @ts-ignore
          onValueChange={setPassword}
          label="password"
          type="password"
        />

        <button disabled={submitting}>Log in</button>
      </form>
      <button onClick={() => history.push("/signup")}>SignUp</button>
    </div>
  );
};
