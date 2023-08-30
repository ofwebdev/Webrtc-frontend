export interface ChildrenProps {
    children: React.ReactNode;
}

export interface ButtonProps {
    onClick?: () => void;
    className: string;
    testId?: string;
    type?: "submit" | "button" | "reset";
    children: ReactNode; 
    roomId?: string;
}

export interface IPeer {
    userName: string;
    peerId: string;
}



export interface IMessage {
    content: string;
    author?: string;
    timestamp: number;
}


declare global {
    interface AUTWindow {
        Peer: Peer;
    }
    interface Window {
        Cypress: Cypress.Cypress;
        Peer: Peer;
    }
}

export default global;