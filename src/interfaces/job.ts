export interface JobI {
    name: string
    mp_cost: number
    base_hp_gain: number
    base_hp: number[]
    hp_gain_skill: number
    hp_gain_skill_level: number
    first_job_stat_requirement: number
    mp_gain_skill: number
    mp_gain_skill_level: number
    base_mp: (level: number) => number
}

