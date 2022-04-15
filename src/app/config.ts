export const maxInputLength = 32;
export const defaultLevel = 1;
export const startTime = '00:00:00';

export type Level = 1 | 2 | 3 | 4;

export interface IRowsColumnsAndFlagsMap {
  countOfRows: null[],
  countOfColumns: null[],
  flagsMap: boolean[]
}

export enum Path {
  main = 'main',
  start = 'start'
}

export enum LocalStorageKey {
  name = 'name',
  current_record = 'current_record'
}

export enum SocketMessage {
  map = 'map:',
  loseGame = 'open: You lose'
}

export enum GameEventMessages {
  playerWon = 'You won!',
  playerLose = 'You lose',
  playerTime = 'Your time:',
  recordTime = 'Record time:'
}

export enum CellClass {
  flag = 'flag',
  unopened = 'empty-cell',
  zero = 'null-cell',
  opened = 'opened-cell'
}

export type CellClassType = typeof CellClass[keyof typeof CellClass]

export const openedCellsTypes = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export type OpenedCell = (typeof openedCellsTypes)[number];

export const Cell = {
  zero: '0',
  unopened: 'ㅤ',
  flag: '🚩',
  square:  '□'
} as const;

export type AcceptedCells = OpenedCell | typeof Cell[keyof typeof Cell];

