

export function KangalView(props){
    const {kangal} = props;
    return(
        <div className="card p-1" >
            {kangal.content}
        </div>
    )

}