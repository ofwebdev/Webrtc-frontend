import { createContext, useEffect, useState, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { ChildrenProps, IMessage } from "./../type";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { peerReducer } from "../reducers/peerReducer";
import {
  addPeerStreamAction,
  removePeerStreamAction,
} from "../reducers/peerActions";
import { chatReducer } from "../reducers/chatReducer";
import { addHistoryAction, addMessageAction } from "../reducers/chatActions";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});
  // const [screenStream, setScreenStream] = useState<MediaStream>();
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  // Chat
  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });

  const navigate = useNavigate();

  const getUser = ({ participants }: { participants: string[] }) => {
    console.log(participants);
  };

  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerStreamAction(peerId));
  };

  const switchStream = (stream: MediaStream) => {
    setStream(stream);
    setScreenSharingId(me?.id || "");
    Object.values(me?.connections).forEach((connection: any) => {
      const videoTrack = stream
        ?.getTracks()
        .find((track) => track.kind === "video");
      console.log(connection[0].peerConnection.getSenders()[1]);
      connection[0].peerConnection
        .getSenders()[1]
        // .find((sender: any) => sender.track.kind === "video")
        .replaceTrack(videoTrack)
        .catch((err: any) => console.error(err));
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
      // (stream) => {
      //   switchStream(stream);
      //   setScreenStream(stream);
      // }
    }
  };

  const sendMessage = (message: string) => {
    const messageData: IMessage = {
      content: message,
      timestamp: new Date().getTime(),
      author: me?.id,
    };

    ws.emit("send-message", roomId, messageData);
  };

  const addMessage = (message: IMessage) => {
    // console.log("new :", message);
    chatDispatch(addMessageAction(message));
  };

  // const addHistory = (messages: IMessage[]) => {
  //   chatDispatch(addHistoryAction(messages));
  // };

  useEffect(() => {
    const myId = uuidv4();

    const peer = new Peer(
      myId,

      {
        host: "localhost",
        path: "/",
        port: 9001,
      }
    );
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.error(error);
    }

    ws.on("room-create", enterRoom);
    ws.on("get-users", getUser);
    ws.on("user-disconnected", removePeer);
    ws.on("user-started-screen", (peerId) => setScreenSharingId(peerId));
    ws.on("user-stopped-screen", () => setScreenSharingId(""));
    ws.on("add-message", addMessage);
    ws.on("get-messages", (messages) => console.log({ messages }));

    return () => {
      ws.off("room-created");
      ws.off("get-users");
      ws.off("user-disconnected");
      ws.off("user-started-sharing");
      ws.off("user-stopped-sharing");
      ws.off("add-message");

      // ws.off("user-joined");
      // ws.off("name-changed");
      // me?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (screenSharingId) {
      ws.emit("start-sharing", { peerId: screenSharingId, roomId });
    } else {
      ws.emit("stop-sharing");
    }
  }, [screenSharingId, roomId]);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);

      call.on("stream", (peerStream) => {
        return dispatch(addPeerStreamAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        return dispatch(addPeerStreamAction(call.peer, peerStream));
      });
    });
  }, [me, stream, peers]);

  console.log({ peers });

  return (
    <RoomContext.Provider
      value={{
        ws,
        me,
        stream,
        peers,
        shareScreen,
        screenSharingId,
        setRoomId,
        sendMessage,
        chat,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
