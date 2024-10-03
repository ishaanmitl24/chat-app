import { useState } from "react";
import Header from "../components/Headers/Header";
import Search from "../components/Search/Search";
import UserList from "../components/UserList/UserList";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Header badge={true} title="Message" showButton={true} />
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
          height: "100%",
        }}
      >
        <Search
          value={search}
          setValue={setSearch}
          placeholder="search messages"
        />
        <UserList />
      </div>
    </div>
  );
};

export default Home;
