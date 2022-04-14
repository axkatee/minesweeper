export const maxInputLength = 32;
export const defaultLevel = 1;

export type Level = 1 | 2 | 3 | 4;

export interface IGameConfig {
  isStarted: boolean,
  level: Level
}
