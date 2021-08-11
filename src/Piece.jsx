import React from 'react'

import { useDrag, DragPreviewImage } from 'react-dnd'

export default function Piece({ piece
    : { type, color }
}) {



    const [{ isDragging }, drag, preview] = useDrag(({

        // before version 14.0

        // item: {
        //     type: 'piece',
        // },


        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),

        type: 'piece',
        item: () => ({ id: `${type}_${color}`, })



    }))





    const pieceImg = require(`./assets/${type}_${color}.png`).default;

    // console.log(pieceImg)

    return (
        <>

            <DragPreviewImage connect={preview} src={pieceImg} />

            <div
                className="piece-container"
                ref={drag}
                style={{ opacity: isDragging ? 0 : 1 }}
            >
                <img src={pieceImg} alt="" className="piece" />
            </div>
        </>
    )
}
