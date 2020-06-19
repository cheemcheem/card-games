import * as Cookie from "js-cookie";
import {log} from "./log";
import {URLS} from "./constant";
import {CardOrder, CardSuit, CardType} from "../common/types";

const {AUTH_URL, GET_GAME_URL, NEW_GAME_URL, DELETE_GAME_URL, EXIT_GAME_URL, JOIN_GAME_URL, GET_HAND_URL} = URLS;

const getXSRFRequestInit = () => ({headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}});

const fetchX = (input: RequestInfo, init?: RequestInit) => {
  const xsrfCookie: RequestInit = getXSRFRequestInit();
  return fetch(input, {...init, ...xsrfCookie});
};

export const authenticate = () => fetchX(AUTH_URL).then(log).then(result => result.status === 204);

export const startNewGame = () => fetchX(NEW_GAME_URL, {method: 'POST'}).then(log).then(result => result.text());

export const deleteGame = () => fetchX(DELETE_GAME_URL, {method: 'DELETE'}).then(log);

export const exitGame = () => fetchX(EXIT_GAME_URL, {method: 'DELETE'}).then(log);

export const joinExistingGame = (gameId: string) => fetchX(log(`${JOIN_GAME_URL}/${gameId}`), {method: 'PUT'}).then(log);

export const getGame = () => fetchX(GET_GAME_URL).then(log).then(handleResponseWithContent).then(log);

export const getHand = () => fetchX(GET_HAND_URL).then(log)
    .then(handleResponseWithContent)
    .then(json => (json as { hand: [{ suit: string, value: number }] }).hand)
    .then(hand => hand.map(({suit, value}) => ({
      suit: suit.charAt(0).toUpperCase() + suit.slice(1).toLowerCase() as CardSuit,
      number: CardOrder.get(value)
    } as CardType)))
;

const handleResponseWithContent = (response: Response) => {
  if (response.status === 200) return response.json();
  throw new Error(`Response has status ${response.status}.`);
};