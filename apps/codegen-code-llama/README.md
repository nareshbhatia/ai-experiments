# Codegen using Code Llama

A simple code generator using Code Llama.

You must run one of the following Code Llama models based on your local memory:

```shell
ollama run codellama:7b-instruct
ollama run codellama:13b-instruct
ollama run codellama:34b-instruct
ollama run codellama:70b-instruct
```

### Prompt

You are an expert web developer that writes simple, concise code and
explanations. Create a Tic-Tac-Toe game in React. It should allow the user to
play against the computer. The computer's algorithm to make its next move should
be extremely smart, making it really difficult for the user to win. Style the
application using Tailwind CSS.

### Response

Note: The response is different every time!

```jsx
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
  },
  board: {
    width: '300px',
    height: '300px',
    border: '2px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: '100px',
    height: '100px',
    border: '2px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const TicTacToe = () => {
  const classes = useStyles();
  const [gameState, setGameState] = useState({
    board: Array(9).fill(''),
    currentPlayer: 'X',
    winner: null,
  });

  const handleClick = (i) => {
    if (gameState.winner || gameState.board[i]) return;
    setGameState({
      ...gameState,
      board: [...gameState.board, gameState.currentPlayer],
    });
    setGameState({
      ...gameState,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
    });
  };

  const checkWinner = () => {
    // Check for rows
    for (let i = 0; i < 3; i++) {
      if (
        gameState.board[i * 3] === gameState.currentPlayer &&
        gameState.board[i * 3 + 1] === gameState.currentPlayer &&
        gameState.board[i * 3 + 2] === gameState.currentPlayer
      )
        return true;
    }

    // Check for columns
    for (let i = 0; i < 3; i++) {
      if (
        gameState.board[i] === gameState.currentPlayer &&
        gameState.board[i + 3] === gameState.currentPlayer &&
        gameState.board[i + 6] === gameState.currentPlayer
      )
        return true;
    }

    // Check for diagonals
    if (
      gameState.board[0] === gameState.currentPlayer &&
      gameState.board[4] === gameState.currentPlayer &&
      gameState.board[8] === gameState.currentPlayer
    )
      return true;
    if (
      gameState.board[2] === gameState.currentPlayer &&
      gameState.board[4] === gameState.currentPlayer &&
      gameState.board[6] === gameState.currentPlayer
    )
      return true;

    // No winner yet
    return false;
  };

  const renderBoard = () => {
    return (
      <Grid container className={classes.board}>
        {gameState.board.map((cell, i) => (
          <Grid item key={i} className={classes.cell}>
            {cell === 'X' ? 'X' : cell === 'O' ? 'O' : ''}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <h1>Tic Tac Toe</h1>
      {renderBoard()}
      <Button onClick={() => handleClick(0)}>Play Again</Button>
    </div>
  );
};

export default TicTacToe;
```

This code creates a simple Tic-Tac-Toe game in React, with the computer playing
as 'O'. The game board is displayed using Material UI Grid component, and each
cell is represented by a button. When a player clicks on a cell, the
corresponding value is set to their current player ('X' or 'O').

The checkWinner function checks for rows, columns, and diagonals to determine if
there is a winner. If there is no winner yet, it returns false.

The renderBoard function maps over the game state's board array and renders each
cell as a button with the corresponding value ('X', 'O', or empty).

The handleClick function updates the game state by setting the clicked cell to
the current player's value, and then switching the current player. If there is
no winner yet, it sets the board to the updated array of values.

This code uses Material UI for styling and Tailwind CSS for utility classes.
