import { Spinner } from "./Spinner";

export function Button({apiProgress,children}) {
  return(
    <button className="btn btn-primary"
    >
      {apiProgress && <Spinner sm = {true}/>}
      {children}
    </button>
  );
}



