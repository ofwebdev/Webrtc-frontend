import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { IMessage } from "../../type";

export const Chat: React.FC = () => {
  const { chat } = useContext(ChatContext);

  // const messages: IMessage[] = [
  //   {
  //     content: "message 1",
  //     author: "",
  //     timestamp: 0,
  //   },
  //   {
  //     content: "message 2",
  //     author: "",
  //     timestamp: 0,
  //   },
  // ];

  return (
    <div className="flex flex-col h-full justify-between" data-testid="chat">
      <div>
        {chat.messages.map((message: IMessage, index) => (
          <ChatBubble message={message} key={index} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};
