import { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import Search from "../components/Search/Search";
import UserList from "../components/UserList/UserList";
import { useAppSelector } from "../store";
import toast from "react-hot-toast";
import { userMessagesData } from "../models/user";
import { Box, CircularProgress, LinearProgress } from "@mui/material";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalMessageCount, setTotalMessageCount] = useState<number>(0);
  const [userData, setUserData] = useState<userMessagesData[]>([]);

  const { userId, token } = useAppSelector((state) => state.auth);

  const fetchUserMessagesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4001/messages/get-all-messages/${userId}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.ok) {
        setUserData(responseData?.data || []);
        setPages(responseData?.pages || 0);
        setTotalMessageCount(responseData?.totalMessageCount || 0);
      }
      console.log(responseData);
    } catch (err) {
      toast.error("An error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserMessagesData();
  }, [page]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "100vh",
      }}
    >
      <Header
        count={totalMessageCount}
        badge={true}
        title="Message"
        showButton={true}
      />
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

        {loading && (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: "#5775e1",
            }}
          >
            <CircularProgress
              size={100}
              color="inherit"
              sx={{ alignSelf: "center" }}
            />
          </Box>
        )}

        {!loading && (
          <UserList
            userData={userData}
            page={page}
            pages={pages}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
