import MessageHeader from "../components/MessageHeader/MessageHeader";

const Message: React.FC<{}> = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <MessageHeader />
    </div>
  );
};

export default Message;
