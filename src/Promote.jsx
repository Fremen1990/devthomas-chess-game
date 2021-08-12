import React from 'react'
import Square from './Square'
import { move } from "./Game"

// rook, knight, bishop, queen
const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({ promotion: { from, to, color }, }) {
    return (
        <div className="board">
            {promotionPieces.map((p, i) => (<div className="promote-square" key={i}>

                <Square black={i % 3 === 0}>


                    <div className="piece-container" onClick={() => move(from, to, p)}>
                        <img src={require(`./assets/${p}_${color}.png`).default} alt="" className="piece cursor-pointer" />
                    </div>

                </Square>

                {/* {p} */}
            </div>))}
        </div>
    )
}
