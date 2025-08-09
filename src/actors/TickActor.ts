import { GameEngine } from '../engine/GameEngine';
import { TICK_INTERVAL_SECONDS } from '../systems/TimeSystem';

export class TickActor {
  private timerId: ReturnType<typeof setInterval> | null = null;
  private gameEngine: GameEngine;

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine;
  }

  public start(): void {
    if (this.timerId) {
      return; // Already started
    }

    // Dispatch a tick immediately on start to handle offline progress
    this.dispatchTick();

    this.timerId = setInterval(() => {
      this.dispatchTick();
    }, TICK_INTERVAL_SECONDS * 1000);
  }

  public stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private dispatchTick(): void {
    this.gameEngine.dispatch({ type: 'TICK' });
  }
}
