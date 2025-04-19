export interface PlanResultI {
  characterName: string,
  hpGoal?: number,
  mpGoal?: number,
  levelGoal: number,
  job: string,
  baseInt?: number,
  mpWashes?: number,
  health?: number, 
  washes: number,
  success: boolean,
  freshApIntoHpTotal?: number,
  startingBaseInt?: number
  startingLevel?: number,
  mana?: number
}