import React, { useEffect, useState } from "react";
import classes from "../FriendsList/FriendList.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Badge from "../Badge/Badge";
import AcceptFriend from "../AcceptFriend/AcceptFriend";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store";
import {
  setAddFriendData,
  setPage,
  setPages,
  setTotalFriends as dispatchTotalFriends,
  setRequestPage as dispatchRequestPage,
  setRequestPages as dispatchRequestPages,
  setRequetsData,
  setTotalPendingRequests,
} from "../../store/friends/index";
import { friendsData, pendingRequestsData } from "../../models/user";
import FriendsCard from "../FriendsCard/FriendsCard";
import Pagination from "../Pagination/Pagination";
import { LinearProgress } from "@mui/material";

const FriendList: React.FC<{}> = () => {
  //Redux states
  const {
    addFriendData,
    page,
    pages,
    requestPage: pendingPage,
    requestPages: pendingpages,
    friendRequestsData,
    totalRequests,
    totalFriends: friendsTotal,
  } = useAppSelector((state) => state.friend);
  const { userId, token } = useAppSelector((state) => state.auth);

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Local states
  const [requestPage, setRequestPage] = useState<number>(pendingPage);
  const [requestPages, setRequestPages] = useState<number>(pendingpages);
  const [totalRequest, setTotalRequests] = useState<number>(totalRequests);
  const [pendingRequestsData, setPendingRequestsData] = useState<
    pendingRequestsData[]
  >(friendRequestsData);
  const [friends, setFriends] = useState<friendsData[]>(addFriendData);
  const [friendsPage, setFriendsPage] = useState<number>(page);
  const [friendsPages, setFriendsPages] = useState<number>(pages);
  const [totalFriends, setTotalFriends] = useState<number>(friendsTotal);
  const [friendsLoading, setFriendsLoading] = useState<boolean>(false);
  const [pendingRequestsLoading, setPendingRequestsLoading] = useState<boolean>(
    false
  );
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
          dispatch(setRequetsData({ requestData: data?.requests }));
          setTotalRequests(data.totalRequest);
          dispatch(
            setTotalPendingRequests({ totalRequest: data?.totalRequest })
          );
          if (data.pages !== requestPages) {
            setRequestPages(data.pages);
            dispatch(dispatchRequestPages({ pages: data?.pages }));
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
      dispatch(dispatchRequestPage({ page: requestPage }));
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
          dispatch(setAddFriendData({ addFriendUserData: data.friends }));
          dispatch(dispatchTotalFriends({ totalFriends: data.totalFriends }));
          if (friendsPages !== data.pages) {
            setFriendsPages(data.pages);
            dispatch(setPages({ pages: data.pages }));
            setFriendsPage((prev) => (prev === 1 ? 1 : prev - 1));
          }
        }
      } catch (err) {
        console.log(err);
      }
      setFriendsLoading(false);
    };
    if (
      pendingRequestTrigger.length > 0 ||
      friendsPage ||
      friends.length === 0
    ) {
      dispatch(setPage({ page: friendsPage }));
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
