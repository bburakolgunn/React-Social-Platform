import defaultProfileImage from "../../../../assets/profile.png";

export function ProfileCard({user}){

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

            </div>
        </div>
    )

}