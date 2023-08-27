import { createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ChildrenProps } from "./../type";
import { useNavigate } from "react-router-dom";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const sw = socketIOClient(WS);

export const RoomProvider: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };
  useEffect(() => {
    sw.on("room-create", enterRoom);
  }, []);
  return <RoomContext.Provider value={{ sw }}>{children}</RoomContext.Provider>;
};
