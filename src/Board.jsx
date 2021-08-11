import React from 'react'
import BoardSquare from './BoardSquare'


export default function Board({ board }) {

    function getXYPosition(i) {
        const x = i % 8 // modulo from 8 collumns
        const y = Math.abs(Math.floor(i / 8) - 7) // math absolute -> floor root minus rest of collumns
        return { x, y }
    }

    function isBlack(i) {
        const { x, y } = getXYPosition(i)
        return (x + y) % 2 === 1 // modulo from X+Y === then is black
    }


    function getPosition(i) {
        const { x, y } = getXYPosition(i)
        const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x]
        return `${letter}${y + 1}`
    }

    return (
        <div className="board">
            {board.flat().map((piece, i) =>

                <div key={i} className="square">
                    {/* <p>{JSON.stringify(piece)}</p> */}
                    <BoardSquare piece={piece} black={isBlack(i)} />
                </div>

            )}
        </div>
    )
}
