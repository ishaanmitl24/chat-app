import React, { useEffect, useState } from "react";
import classes from "../FriendsList/FriendList.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Badge from "../Badge/Badge";
import AcceptFriend from "../AcceptFriend/AcceptFriend";
import { useAppSelector } from "../../store";
import { friendsData, pendingRequestsData } from "../../models/user";
import FriendsCard from "../FriendsCard/FriendsCard";
import Pagination from "../Pagination/Pagination";
import { LinearProgress } from "@mui/material";

const FriendList: React.FC<{}> = () => {
  const [pendingRequestsLoading, setPendingRequestsLoading] = useState<boolean>(
    false
  );
  const [requestPage, setRequestPage] = useState<number>(1);
  const [requestPages, setRequestPages] = useState<number>(1);
  const [totalRequest, setTotalRequests] = useState<number>(0);
  const [friendsLoading, setFriendsLoading] = useState<boolean>(false);
  const [pendingRequestsData, setPendingRequestsData] = useState<
    pendingRequestsData[]
  >([]);
  const [friends, setFriends] = useState<friendsData[]>([]);
  const [friendsPage, setFriendsPage] = useState<number>(1);
  const [friendsPages, setFriendsPages] = useState<number>(1);
  const [totalFriends, setTotalFriends] = useState<number>(0);
  const { userId, token } = useAppSelector((state) => state.auth);
  const [pendingRequestTrigger, setPendingRequestTrigger] = useState<string>(
    "trigger"
  );

  useEffect(() => {
    const getPendingRequets = async () => {
      setPendingRequestsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4001/friend/pending-requests?page=${requestPage}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );
        const data = await response.json();
        if (data.ok) {
          setPendingRequestsData(data.requests);
          setTotalRequests(data.totalRequest);
          if (data.pages !== requestPages) {
            setRequestPages(data.pages);
            setRequestPage((prev) => (prev === 1 ? 1 : prev - 1));
          }
        }
      } catch (err) {
        console.log(err);
      }
      setPendingRequestsLoading(false);
    };
    if (requestPages === 0) {
      setPendingRequestTrigger("");
    } else if (pendingRequestTrigger.length > 0 || requestPages !== 0) {
      getPendingRequets();
    }
  }, [pendingRequestTrigger, requestPage, requestPages]);

  useEffect(() => {
    const getFriends = async () => {
      setFriendsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4001/friend/get-friends?page=${friendsPage}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );
        const data = await response.json();
        if (data.ok) {
          setFriends(data.friends);
          setTotalFriends(data.totalFriends);
          if (friendsPages !== data.pages) {
            setFriendsPages(data.pages);
            setFriendsPage((prev) => (prev === 1 ? 1 : prev - 1));
          }
        }
      } catch (err) {
        console.log(err);
      }
      setFriendsLoading(false);
    };
    if (pendingRequestTrigger.length > 0 || friendsPage) {
      getFriends();
    }
  }, [pendingRequestTrigger, friendsPage, friendsPages]);

  return (
    <div className={classes["friend-list-container"]}>
      <div className={classes.pending_requests}>
        <div className={classes.pending_requests_headers}>
          <Icon style={{ fontSize: "24px" }} icon="mdi:account-pending" />
          <span className={classes.request_title}>Pending requests</span>
          <Badge color="#DBA740" count={totalRequest} />
        </div>
        {pendingRequestsLoading && (
          <div>
            <LinearProgress />
          </div>
        )}
        {pendingRequestsData.length === 0 && !pendingRequestsLoading && (
          <div className={classes["no-data"]}>No Pending Requests!</div>
        )}
        <div className={classes.pending_data}>
          {pendingRequestsData &&
            pendingRequestsData.map((item) => (
              <AcceptFriend
                name={item.name}
                connectionId={item._id}
                email={item.email}
                setPendingRequestTrigger={setPendingRequestTrigger}
              />
            ))}
        </div>
        {requestPages > 1 && (
          <Pagination
            page={requestPage}
            pages={requestPages}
            setPage={setRequestPage}
          />
        )}
      </div>
      <div className={classes.friends}>
        <div className={classes.friends_headers}>
          <Icon
            style={{ fontSize: "24px", color: "white" }}
            icon="mdi:people"
          />
          <span className={classes.friend_title}>Friends</span>
          <Badge count={totalFriends} />
        </div>
        {friendsLoading && (
          <div>
            <LinearProgress />
          </div>
        )}
        {friends.length === 0 && !friendsLoading && (
          <div className={classes["no-data"]}>No Friends Added!</div>
        )}
        {friends &&
          friends.map((item) => (
            <FriendsCard name={item.name} email={item.email} id={item._id} />
          ))}
        {friendsPages > 1 && (
          <Pagination
            page={friendsPage}
            pages={friendsPages}
            setPage={setFriendsPage}
          />
        )}
      </div>
    </div>
  );
};

export default FriendList;
