import { useContext } from "react";
import { Button } from "./common/Button";
import { RoomContext } from "../context/RoomContext";

export default function JoinButton(): JSX.Element {
  const { sw } = useContext(RoomContext);

  const createRoom = () => {
    sw.emit("create-room");
  };

  return (
    <div className=" flex flex-col">
      <Button onClick={createRoom} className="py-2 px-8 text-xl">
        Start new meeting
      </Button>
    </div>
  );
}
