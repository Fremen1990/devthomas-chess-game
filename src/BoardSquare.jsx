import React from 'react'
import Square from './Square'
import Piece from './Piece'

import { useDrop } from 'react-dnd'

export default function BoardSquare({ piece, black }) {

    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => { console.log(item) }
    })

    return (
        <div className="board-square" ref={drop}>


            <Square black={black}>
                {piece &&
                    <Piece piece={piece} />
                }
            </Square>
        </div>
    )
}
