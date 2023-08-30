import React from "react";
import { HiChatAlt2 } from "react-icons/hi";
import { Button } from "./common/Button";

interface ChatButtonProps {
  onClick: () => void;
}

export default function ShareScreenButton({ onClick }: ChatButtonProps) {
  return (
    <Button onClick={onClick} className="py-2 px-8 text-xl">
      <HiChatAlt2 />
    </Button>
  );
}
