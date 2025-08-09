import { GameState, Action } from '../state/types';

export const TICK_INTERVAL_SECONDS = 15;

/**
 * Processes a 'TICK' action, updating the game's time data.
 * This function calculates the number of ticks that should have occurred
 * since the last saved timestamp and updates the state accordingly.
 * This handles both online and offline progression.
 * @param state The current game state.
 * @param action The action being dispatched. Must be of type 'TICK'.
 * @returns The new game state with updated time.
 */
function processTick(state: GameState): GameState {
  const now = Date.now();
  const timeSinceLastTick = now - state.time.lastTickTimestamp;

  // If no time has passed, or time went backwards, do nothing.
  if (timeSinceLastTick <= 0) {
    return state;
  }

  const ticksToProcess = Math.floor(timeSinceLastTick / (TICK_INTERVAL_SECONDS * 1000));

  if (ticksToProcess <= 0) {
    return state;
  }

  // Here we would process the state changes for each tick.
  // For now, we just update the time data.
  // This will be expanded when other systems are implemented.
  const newState = { ...state };
  for (let i = 0; i < ticksToProcess; i++) {
    // In the future, systems like PetSystem will be called here for each tick.
    newState.time.totalTicksPlayed += 1;
  }

  newState.time.lastTickTimestamp = now;

  return newState;
}


export const TimeSystem = {
  reduce(state: GameState, action: Action): GameState {
    switch (action.type) {
      case 'TICK':
        return processTick(state);
      default:
        return state;
    }
  },
};
