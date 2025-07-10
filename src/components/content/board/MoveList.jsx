import "./MoveList.css"
export function MoveList({list,current,accessBoard}){

    return (
        <div className="moveList-div">
            <div className="moveList-div-scrollable">
                <h3 className="move-heading">List of Moves</h3>

                <div className="moveList-content">
                    {list.map((move, idx)=>{
                        if (idx % 2 == 0){
                            return (
                                <>
                                <div className="move-number">
                                    {(idx / 2 + 1)}
                                </div>
                                <div className={"move-white " + ((idx == current - 1) ? "last-move" : "")}>
                                    <button onClick={()=>{
                                        accessBoard(idx + 1);
                                    }}>{move[0]}-{move[1]}</button>
                                </div>
                                </>
                            );
                        }

                        return (
                            <div className={"move-black " + ((idx == current - 1) ? "last-move" : "")}>
                                <button onClick={()=>{
                                    accessBoard(idx + 1);
                                }}>{move[0]}-{move[1]}</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}