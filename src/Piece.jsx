import React from 'react'



export default function Piece({ piece
    : { type, color }
}) {

    const pieceImg = require(`./assets/${type}_${color}.png`)

    // console.log(piece)

    return (
        <div>

            <img src={pieceImg} alt="" />

            {/* {piece.type} */}

        </div>
    )
}
