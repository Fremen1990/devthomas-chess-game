import React, { useEffect, useState } from "react";
import BoardSquare from "./BoardSquare";

export default function Board({ board, turn }) {
    const [currBoard, setCurrBoard] = useState([]);

    useEffect(() => {
        setCurrBoard(turn === "w" ? board.flat() : board.flat().reverse());
    }, [board, turn]);

    function getXYPosition(i) {
        const x = turn === "w" ? i % 8 : Math.abs((i % 8) - 7); // modulo from 8 collumns
        const y =
            turn === "w" ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
        // math absolute -> floor root minus rest of collumns
        return { x, y };
    }

    function isBlack(i) {
        const { x, y } = getXYPosition(i);
        return (x + y) % 2 === 1; // modulo from X+Y === then is black
    }

    function getPosition(i) {
        const { x, y } = getXYPosition(i);
        const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
        return `${letter}${y + 1}`;
    }

    return (
        <div className="board">
            {currBoard.map((piece, i) => (
                <div key={i} className="square">
                    {/* <p>{JSON.stringify(piece)}</p> */}
                    <BoardSquare
                        piece={piece}
                        black={isBlack(i)}
                        position={getPosition(i)}
                    />
                </div>
            ))}
        </div>
    );
}
