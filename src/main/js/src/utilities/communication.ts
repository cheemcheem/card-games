import * as Cookie from "js-cookie";
import {log} from "./log";
import {URLS} from "./constant";
import {CardOrder, CardSuit, CardType} from "../common/types";

const {AUTH_URL, GAME_DETAILS_URL, GAME_STATIC_DETAILS_URL, NEW_GAME_URL, DELETE_GAME_URL, EXIT_GAME_URL, JOIN_GAME_URL, GET_HAND_URL, GET_GAME_TYPES_URL, START_GAME_URL} = URLS;

const getXSRFRequestInit = () => ({headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}});

const fetchX = (input: RequestInfo, init?: RequestInit) => {
  const xsrfCookie: RequestInit = getXSRFRequestInit();
  return fetch(input, {...init, headers: {...init?.headers, ...xsrfCookie.headers}});
};

export const authenticate = () => fetchX(AUTH_URL).then(result => result.status === 204);

export const startNewGame = (gameType: string, userName: string) => fetchX(
    NEW_GAME_URL, {
      method: 'POST',
      body: log(JSON.stringify({gameType, userName})),
      headers: {'Content-Type': 'application/json'}
    }).then(log).then(result => result.text());

export const deleteGame = () => fetchX(DELETE_GAME_URL, {method: 'DELETE'}).then(log);

export const exitGame = () => fetchX(EXIT_GAME_URL, {method: 'DELETE'}).then(log);

export const joinExistingGame = (gameId: string, userName: string) => fetchX(
    JOIN_GAME_URL, {
      method: 'PUT',
      body: log(JSON.stringify({gameId, userName})),
      headers: {'Content-Type': 'application/json'}
    }).then(log);

export const getGameDetails = () => fetchX(GAME_DETAILS_URL).then(handleResponseWithContent);
export const getGameStaticDetails = () => fetchX(GAME_STATIC_DETAILS_URL).then(handleResponseWithContent);

export const getHand = () => fetchX(GET_HAND_URL).then(log)
    .then(handleResponseWithContent)
    .then(json => (json as { hand: [{ suit: string, value: number }] }).hand)
    .then(hand => hand.map(({suit, value}) => ({
      suit: suit.charAt(0).toUpperCase() + suit.slice(1).toLowerCase() as CardSuit,
      number: CardOrder.get(value)
    } as CardType)))
;

export const getGameTypes = () => fetchX(GET_GAME_TYPES_URL).then(log)
    .then(handleResponseWithContent)
    .then(json => (json as string[]))
;

export const startGame = () => fetchX(START_GAME_URL, {method: 'POST'}).then(log);

const handleResponseWithContent = (response: Response) => {
  if (response.status === 200) return response.json();
  throw new Error(`Response has status ${response.status}.`);
};