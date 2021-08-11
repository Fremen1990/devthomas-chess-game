import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject } from "./Game";
import Board from "./Board";


function App() {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board));
    return () => subscribe.unsubscribe();
  }, []);



  return (<>
    <h1 className="game-name">DEVTHOMAS CHESS GAME!!! :)

    </h1>


    <div className="container">

      <div className="board-container">

        <Board board={board} />

      </div>



    </div>
  </>

  );
}

export default App;
