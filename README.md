# Minesweeper Game

This is a simple 8x8 Minesweeper game implemented as a single-page web application using HTML, CSS, and JavaScript.

## Features

-   An 8x8 grid with 10 randomly placed mines.
-   Clicking a non-mine square reveals its content (either a number indicating adjacent mines or an empty space).
-   Clicking an empty space (with 0 adjacent mines) automatically reveals all adjacent empty spaces and their bordering numbered squares (flood fill).
-   Hitting a mine results in a "Game Over" state, revealing all mines.
-   Winning the game by revealing all non-mine squares results in a "You Win" message.
-   A reset button to start a new game.

## How to Play

1.  Open `index.html` in your web browser.
2.  Click on any square to reveal it.
3.  If you click on a square with a number, it indicates how many mines are in the 8 surrounding squares.
4.  If you click on an empty square (no number), it will automatically clear a larger area for you.
5.  Avoid clicking squares with mines!
6.  Use the 'Reset Game' button to start a new game at any time.

## Project Structure

-   `index.html`: The main HTML file that sets up the game structure.
-   `style.css`: Contains all the styling for the game grid and cells.
-   `script.js`: Implements the game logic, board creation, mine placement, click handling, and win/lose conditions.

Enjoy the game!