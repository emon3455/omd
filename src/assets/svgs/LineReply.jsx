import {} from "react";
import { cn } from "../../utils/cn";

const LineReply = ({
  className,
  fill = "#003413",
  size = { width: 18, height: 14 },
  ...props
}) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      {...props}
    >
      <path
        d="M8.83284 0.666667L17.1662 7.33333L8.83284 14V9.83333C4.23034 9.83333 0.499512 6.1025 0.499512 1.5C0.499512 1.2725 0.507845 1.0475 0.526178 0.825001C1.74535 3.13667 4.13451 4.73417 6.90534 4.82917L7.16618 4.83333H8.83284V0.666667ZM10.4995 6.5H7.13784L6.84868 6.49417C5.77785 6.45833 4.74535 6.23583 3.78535 5.85583C5.00784 7.27083 6.81618 8.16667 8.83284 8.16667H10.4995V10.5325L14.4978 7.33333L10.4995 4.13417V6.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default LineReply;
