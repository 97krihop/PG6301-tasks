import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJson } from "../lib/http";

interface IUser {
  id: string;
  victories: number;
  defeats: number;
}

export const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const data = await fetchJson("/api/user");
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>hello welcome to quiz game</h1>
      <Link to={"/match"}>
        <button>start game</button>
      </Link>
      <br />
      <br />
      {user != null ? (
        <span>
          welcome {user.id} you have won {user.victories} and lost{" "}
          {user.defeats}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
