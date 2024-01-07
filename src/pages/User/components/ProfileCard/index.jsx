import { useContext } from "react";
import defaultProfileImage from "../../../../assets/profile.png";
import { AuthContext } from "../../../../shared/state/context";
import { Button } from "../../../../shared/components/Button";

export function ProfileCard({user}){
    const authState = useContext(AuthContext);

    return(
        <div className="card">
            <div className="card-header">
            <img
        src={defaultProfileImage}
        width="150"
        className="img-fluid rounded-circle shadow-sm"
      />
            </div>
            <div className="card-body text-center">
                <span className="fs-3">{user.username}</span>
                {authState.id === user.id && <Button>Edit</Button>}
            </div>
        </div>
    )

}