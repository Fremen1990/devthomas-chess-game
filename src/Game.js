import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

let promotion = "rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5";
let staleMate = "4k3/4P3/4K3/8/8/8/8/8 b - - 0 78";
let checkMate = "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";
let insuficcientMaterial = "k7/8/n7/8/8/8/7k b - - 0 1";

const chess = new Chess();

export const gameSubject = new BehaviorSubject({
    board: chess.board(),
});

export function initGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame();
}

export function resetGame() {
    chess.reset()
    updateGame()
}


export function handleMove(from, to) {
    const moves = chess.moves({ verbose: true });
    // console.log(moves)
    // console.table(moves)
    const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
    console.table(promotions);
    if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
        console.log("user is going to promote");
        const pendingPromotion = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion);
    }

    const { pendingPromotion } = gameSubject.getValue();
    if (!pendingPromotion) {
        move(from, to);
    }
}

export function move(from, to, promotion) {
    let tempMove = { from, to };

    if (promotion) {
        tempMove.promotion = promotion;
    }

    // console.log(from, to)
    const legalMove = chess.move(tempMove);

    if (legalMove) {
        console.log(chess.fen());
        updateGame();
    }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over();

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null,
    };

    localStorage.setItem('savedGame', chess.fen())

    gameSubject.next(newGame);
}

function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? "BLACK" : "WHITE"
        return `CHECKMATE - WINNER IS ${winner} `
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = "REPETITION"
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return `UNKNOWN REASON`
    }
}
