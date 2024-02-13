# Card game client

This repository contains the code for the card game client in React with Typescript. The game consists of 4 different types of cards

-   Cat card 😼
-   Defuse card 🙅‍♂️
-   Shuffle card 🔀
-   Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.

Rules –

-   If the card drawn from the deck is a cat card, then the card is removed from the deck.
-   If the card is exploding kitten (bomb) then the player loses the game.
-   If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
-   If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

#### Should be used with https://github.com/Balaguru1601/card-game-server.git

## Features

-   Save game after each update
-   View leaderboard
-   Login/Register to play
-   Update score and leaderboard after win
-   Update the leaderboard at regular intervals - 30s

## Run Locally

Clone the project

```bash
  git clone https://github.com/Balaguru1601/card-game.git
```

Go to the project directory

```bash
  cd card-game
```

Install dependencies

```bash
  npm i
```

```bash
  npm run build
```

Start the server

```bash
  npm run preview
```

To start dev server

```bash
  npm run dev
```

The server will start at port 4173
