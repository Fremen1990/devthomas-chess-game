import React, { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";

import { useDrop } from "react-dnd";
import { handleMove, gameSubject } from "./Game";
import Promote from "./Promote";

export default function BoardSquare({ piece, black, position }) {
    const [promotion, setPromotion] = useState(null);

    const [, drop] = useDrop({
        accept: "piece",
        drop: (item) => {
            // console.log(item)
            const [fromPosition] = item.id.split("_");
            handleMove(fromPosition, position);
        },
    });

    useEffect(() => {
        const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
            pendingPromotion && pendingPromotion.to === position
                ? setPromotion(pendingPromotion)
                : setPromotion(null)
        );
        return () => subscribe.unsubscribe();
    }, []);

    return (
        <div className="board-square" ref={drop}>
            <Square black={black}>

                {/* Ternary - if we have promotion true ->  go to Promote object, if not check the piece, if piece is true render the board, if false do not render  */}
                {promotion ? <Promote promotion={promotion} /> : piece ? <Piece piece={piece} position={position} /> : null}



            </Square>
        </div>
    );
}
