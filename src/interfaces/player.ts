import { EquipmentI } from "./equipment"
import { JobI } from "./job"

export interface SendablePlayerFormatI {
    name: string,
    level_goal: number,
    job: string,
    hp_goal: number,
    maple_warrior_percent: number,
    equipment: EquipmentI[]
}

export interface PlayerI {
    INT: number
    int_goal: number
    level: number
    equipment: EquipmentI[]
    maple_warrior_percent: number
    bonus_mana: number
    bonus_HP: number
    fresh_AP: number
    washes: number
    mp_washes: number
    is_adding_int: boolean
    is_adding_fresh_ap_into_hp: boolean
    is_mp_wash_before_int: boolean
    stale_ap: number
    name: string
    job: JobI
    main_stat: number
    fresh_ap_into_hp_total: number
    id?: number
    gears_int: number
    total_int: number
    health: number
    mana: number
}