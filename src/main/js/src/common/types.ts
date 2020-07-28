export type CardType = {
  number: CardNumber,
  suit: CardSuit
}

export type CardNumber =
    'A'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'J'
    | 'Q'
    | 'K'
export type CardSuit = 'Hearts' | 'Spades' | 'Diamonds' | 'Clubs';
export const CardOrder = new Map<number, CardNumber>([
  [1, 'A'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  [6, '6'],
  [7, '7'],
  [8, '8'],
  [9, '9'],
  [10, '10'],
  [11, 'J'],
  [12, 'Q'],
  [13, 'K'],
]);

export const CardColours = new Map<CardSuit, string>([
  ['Hearts', 'red'],
  ['Diamonds', 'red'],
  ['Clubs', 'black'],
  ['Spades', 'black'],
])

export const CardSymbols = new Map<CardSuit, string>([
  ['Hearts', '♥️'],
  ['Diamonds', '♦️'],
  ['Clubs', '♣️'],
  ['Spades', '♠️'],
])

export type Game = {id: string, owner: string, gameType: string, userName: string, started: boolean, players: string[]};