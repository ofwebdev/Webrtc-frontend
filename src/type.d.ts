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