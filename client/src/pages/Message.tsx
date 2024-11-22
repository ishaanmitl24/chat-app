import { useParams } from "react-router-dom";
import MessageHeader from "../components/MessageHeader/MessageHeader";
import MessageFooter from "../components/MessageFooter/MessageFooter";
import MessagesComponent from "../components/Message/Message";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../store";
import { friend, messageData } from "../models/user";

const Message: React.FC<{}> = () => {
  const { messageConnectionId } = useParams<{ messageConnectionId: string }>();
  const { token, userId } = useAppSelector((state) => state.auth);
  const [messageData, setMessageData] = useState<messageData[]>([]);
  const [friend, setFriendData] = useState<friend>({
    _id: "",
    name: "",
    email: "",
    hashId: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessagesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4001/messages/get-messages/${messageConnectionId}/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData?.ok) {
        setMessageData(responseData?.data || []);
        setFriendData(responseData?.friend || {});
      } else {
        throw new Error(responseData?.msg);
      }
    } catch (err) {
      toast.error("An error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessagesData();
  }, []);
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MessageHeader friend={friend} />
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          overflowY: "scroll",
        }}
      >
        <MessagesComponent messageData={messageData} />
      </div>
      <MessageFooter
        setMessageData={setMessageData}
        messageConnectionId={messageConnectionId}
      />
    </div>
  );
};

export default Message;
