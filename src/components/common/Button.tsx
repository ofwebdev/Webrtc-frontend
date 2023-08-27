import classNames from "classnames";
import { ButtonProps } from "../../type";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  testId,
  className,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      data-testid={testId}
      onClick={onClick}
      className={classNames(
        "bg-rose-400 p-2 rounded-lg hover:bg-rose-600 text-white",
        className
      )}
    >
      {children}
    </button>
  );
};
