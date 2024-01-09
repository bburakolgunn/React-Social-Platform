import { Spinner } from "./Spinner";

export function Button({
  apiProgress,
  children,
  onClick,
  styleType = "primary",
  type
}) {
  return (
    <button className={`btn btn-${styleType}`} onClick={onClick} type = {type} >
      {apiProgress && <Spinner sm={true} />}
      {children}
    </button>
  );
}
