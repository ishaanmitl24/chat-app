import { useState } from "react";
import Header from "../components/Headers/Header";
import FriendList from "../components/FriendsList/FriendList";

const Friends = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <Header badge={false} title="Friends" showButton={false} />
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <FriendList />
      </div>
    </div>
  );
};

export default Friends;
