import "./Menu.css"
import { Board } from "../board/Board.jsx"
export function Menu(){
    return (
        <div className="container">
            <div className="header-div">
                <h2 className="menu-text">Caissa</h2> 
            </div>

            <div className="board-div">
                <Board/>
            </div>

            <div className="footer-div">
                <div>
                    <address>Made using React by Nykaj A K</address>
                </div>
            </div>
        </div>

    )
}