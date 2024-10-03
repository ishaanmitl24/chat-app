import { useState } from "react";
import AddFriendList from "../components/AddFriendList/AddFriendList";
import Header from "../components/Headers/Header";
import Search from "../components/Search/Search";

const AddFriends = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <Header badge={false} title="Add Friends" showButton={false} />
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Search
          value={search}
          setValue={setSearch}
          placeholder="search peoples"
        />
        <AddFriendList search={search} />
      </div>
    </div>
  );
};

export default AddFriends;
