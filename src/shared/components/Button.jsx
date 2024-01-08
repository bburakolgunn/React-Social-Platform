import { Spinner } from "./Spinner";

export function Button({
  apiProgress,
  children,
  onClick,
  styleType = "primary",
}) {
  return (
    <button className={`btn btn-${styleType}`} onClick={onClick}>
      {apiProgress && <Spinner sm={true} />}
      {children}
    </button>
  );
}
