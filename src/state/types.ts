// Pet related types
export enum PetRarity {
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary,
}

export enum HealthState {
  Healthy,
  Injured,
  Sick,
}

export enum PetState {
  Idle,
  Sleeping,
  Travelling,
  Exploring,
  Battling,
  Training,
}

export interface PetData {
  type: string;
  rarity: PetRarity;
  stats: {
    satiety: number;
    hydration: number;
    happiness: number;
  };
  hiddenCounters: {
    satietyTicksLeft: number;
    hydrationTicksLeft: number;
    happinessTicksLeft: number;
    lifeTicksLeft: number;
  };
  healthState: HealthState;
  growthStage: number;
  currentState: PetState;
  battleStats: {
    attack: number;
    defense: number;
    speed: number;
    currentHealth: number;
    maxHealth: number;
  };
  knownMoves: string[];
}

// Inventory related types
export interface Item {
  id: string;
  name: string;
  quantity: number;
  durability?: number;
}

export interface InventoryData {
  items: Item[];
  currency: number;
}

// World related types
export type QuestStatus = 'not-started' | 'in-progress' | 'completed';

export interface Quest {
  status: QuestStatus;
  tasks: Record<string, boolean>; // e.g. { "collect-5-berries": true }
}

export interface WorldData {
  currentLocation: string;
  isTravelling: boolean;
  unlockedLocations: string[];
  questProgress: Record<string, Quest>;
}

// Time related types
export interface TimeData {
  lastTickTimestamp: number;
  totalTicksPlayed: number;
}

// Battle related types
export interface BattleData {
  currentEnemy: string; // For now, just a string. Can be a more complex object later.
  battleState: 'player-turn' | 'enemy-turn' | 'won' | 'lost';
}

// The main GameState
export interface GameState {
  pet: PetData;
  inventory: InventoryData;
  world: WorldData;
  time: TimeData;
  battle?: BattleData;
}

// Action types
export interface Action {
  type: string;
  payload?: unknown;
}
