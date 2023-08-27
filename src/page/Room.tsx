import { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";

export default function Room() {
  const { id } = useParams();

  const { sw } = useContext(RoomContext);

  useEffect(() => {
    sw.emit("join-room", { roomId: id });
  }, [id]);

  return <div>Room Id: {id}</div>;
}
