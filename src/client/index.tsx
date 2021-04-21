import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import { Match } from "./pages/match";
import NotFound from "./pages/not_found";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

const App = () => {
  const [userCount, setUserCount] = useState<string | number>(0);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const protocol =
      window.location.protocol.toLowerCase() === "https:" ? "wss:" : "ws:";
    if (!socket)
      setSocket(new WebSocket(`${protocol}//${window.location.host}`));

    if (socket)
      socket.onmessage = (event) => {
        const dto = JSON.parse(event.data);

        if (!dto || !dto.userCount) {
          setUserCount("ERROR");
          return;
        }
        console.log(dto);
        setUserCount(dto.userCount);
      };
    if (socket)
      socket.onclose = (event) => {
        setTimeout(() => {
          setSocket(new WebSocket(`${protocol}//${window.location.host}`));
        }, 2500);
      };

    return () => {
      socket?.close();
    };
  }, [socket]);

  return (
    <BrowserRouter>
      <nav>
        <p>users: {userCount}</p>
        <Link to={"/"}>
          <button className="quiz">Home</button>
        </Link>
        {"  "}
        <Link to={"/signup"}>
          <button className="quiz">SingUp</button>
        </Link>
        {"  "}
        <Link to={"/login"}>
          <button className="quiz">Login</button>
        </Link>
        {"  "}
        <button
          className="quiz"
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
          }}
        >
          logout
        </button>
      </nav>
      <main>
        <Switch>
          <Route path={"/match"}>
            <Match />
          </Route>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/signup"}>
            <Signup />
          </Route>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
