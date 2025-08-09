import { GameState, Action } from '../state/types';

// A System is an object with a reducer function
export interface System {
  reduce(state: GameState, action: Action): GameState;
}

export class GameEngine {
  private gameState: GameState;
  private systems: System[];

  constructor(initialState: GameState, systems: System[]) {
    this.gameState = initialState;
    this.systems = systems;
  }

  public dispatch(action: Action): void {
    console.log(`Action dispatched: ${action.type}`, action.payload);

    let newState = this.gameState;
    for (const system of this.systems) {
      newState = system.reduce(newState, action);
    }

    this.gameState = newState;
  }

  public getState(): GameState {
    return this.gameState;
  }
}
