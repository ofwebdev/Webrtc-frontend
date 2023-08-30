import { useContext, useState } from "react";
import { Button } from "../common/Button";
import { RoomContext } from "../../context/RoomContext";

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(RoomContext);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <div className="flex ">
          <textarea
            className="border rounded"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button
            testId="send-msg-button"
            type="submit"
            className="bg-rose-400 p-4 mx-2 rounded-lg text-xl hover:bg-rose-600 text-white"
          >
            send
          </Button>
        </div>
      </form>
    </div>
  );
};
