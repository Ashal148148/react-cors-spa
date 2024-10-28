import { EquipmentI } from "../interfaces/equipment"
import { JobI } from "../interfaces/job"
import { PlayerI } from "../interfaces/player"

export class Player implements PlayerI {
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
    id: number

    get gears_int(): number{
        return this.equipment.reduce((prev, current) => prev + current.INT, 0)
    }

    get total_int(): number{
        if (this.level > 8){
            return Math.floor(this.INT * (this.maple_warrior_percent / 100 + 1) + this.gears_int)
        }
        else {
            return this.INT
        }
    }

    get bonus_mana_on_lvl_up(){
        return Math.floor(this.total_int / 10)
    }
    
    get bonus_mana_from_ap(){
        return Math.floor(this.INT / 10 - 2)
    }

    get health(): number{
        return this.bonus_HP + this.job.base_hp[this.level - 1]
    }
    
    get mana(): number{
        return this.bonus_mana + this.job.base_mp(this.level)
    }

    constructor(job: JobI, name: string, maple_warrior_percent: number, int_goal: number = 10, level: number = 1, equipment: EquipmentI[] = [], bonus_HP: number = 0,
                 bonus_mana: number = 0, INT: number = 10, fresh_AP: number = 0, washes: number = 0, is_adding_int: boolean = true, stale_ap: number = 0,
                 main_stat: number = 5, is_adding_fresh_ap_into_hp: boolean = true, mp_washes: number = 0, fresh_ap_into_hp_total: number = 0, id: number = 1,
                 is_mp_wash_before_int: boolean = false){
        this.level = level
        this.int_goal = int_goal
        this.equipment = equipment
        this.bonus_HP = bonus_HP
        this.bonus_mana = bonus_mana
        this.INT = INT
        this.maple_warrior_percent = maple_warrior_percent
        this.fresh_AP = fresh_AP
        this.washes = washes
        this.is_adding_int = is_adding_int
        this.stale_ap = stale_ap
        this.name = name
        this.job = job
        this.main_stat = main_stat
        this.is_adding_fresh_ap_into_hp = is_adding_fresh_ap_into_hp
        this.mp_washes = mp_washes
        this.fresh_ap_into_hp_total = fresh_ap_into_hp_total
        this.id = id
        this.is_mp_wash_before_int = is_mp_wash_before_int
    }

    reset_player(){
        this.level = 1
        this.equipment = []
        this.bonus_HP = 0
        this.bonus_mana = 0
        this.INT = 10
        this.fresh_AP = 0
        this.washes = 0
        this.is_adding_int = true
        this.stale_ap = 0
        this.main_stat = 5
        this.mp_washes = 0
        this.is_adding_fresh_ap_into_hp = true
        this.fresh_ap_into_hp_total = 0
        this.is_mp_wash_before_int = false
    }

    level_up(int_gears: EquipmentI[]){
        if (this.level < 200){
            this.bonus_mana += this.bonus_mana_on_lvl_up
            this.level += 1
            this.fresh_AP += 5
            if (this.level === 70){
                this.fresh_AP += 5
            }
            console.log(`lvled up to ${this.level}`)
            this.gear_up(int_gears)
        }
    }

    add_int(){
        if (this.INT < this.int_goal){
            if (this.level >= (10 - this.job.first_job_stat_requirement / 5) && this.main_stat < this.job.first_job_stat_requirement){
                this.main_stat += this.fresh_AP
                this.INT += this.stale_ap  // there should be no stale number at lvl 7...
            }
            else{
                this.INT += this.fresh_AP
                this.INT += this.stale_ap
            }
            this.fresh_AP = 0
            this.stale_ap = 0
        }
    }

    gear_up(int_gears: EquipmentI[]){
        int_gears.forEach((e) => {        
            if (e.level <= this.level){              
                var isNew = true
                this.equipment.forEach((g, index) => {
                    if (e.category === g.category){
                        isNew = false
                        if (e.INT > g.INT){
                            this.equipment.splice(index, 1, e)
                            console.log(`removing: ${g.name}`)
                            console.log(`equipping: ${e.name}`)   
                        }
                    }
                })              
                if (isNew){
                    console.log(`equipping: ${e.name}`)
                    this.equipment.push(e)
                }                
            }
        })
    }
        
    mp_wash(max_amount=9999){
        var before = this.bonus_mana
        var washes = 0
        if (max_amount > this.fresh_AP){
            washes = this.fresh_AP
        }
        else{
            washes = max_amount
        }
        for (var i = 0; i < washes; i++){
            this.bonus_mana += this.bonus_mana_from_ap
        }
        this.fresh_AP -= washes
        this.stale_ap += washes
        this.washes += washes
        this.mp_washes += washes
        console.log(`at lvl ${this.level} mp wash gain was: ${this.bonus_mana - before}`)
    }

    hp_wash(max_amount=9999, health_goal=30000){
        var washes = 0
        if (max_amount > this.bonus_mana / this.job.mp_cost){
            washes = Math.floor(this.bonus_mana / this.job.mp_cost)
        }
        else{
            washes = max_amount
        }
        for (var i = 0; i < washes; i++){
            if (this.health < health_goal){
                this.bonus_HP += this.job.base_hp_gain
                if (this.is_adding_fresh_ap_into_hp && this.level > this.job.hp_gain_skill_level && this.fresh_AP > 0){
                    this.fresh_AP -= 1
                    this.stale_ap += 1
                    this.bonus_HP += this.job.hp_gain_skill
                    this.fresh_ap_into_hp_total += 1
                }
                this.bonus_mana -= this.job.mp_cost
            }
            else{
                washes = i
                break
            }
        }
        this.washes += washes
    }

    progress(levels: number, int_gears: EquipmentI[]){
        for (var i = 0; i < levels; i++){
            this.level_up(int_gears)
            if (this.is_adding_int && this.is_mp_wash_before_int){
                this.mp_wash()
                this.add_int()
                continue
            }
            if (this.is_adding_int){
                this.add_int()
            }
            if (this.is_mp_wash_before_int){
                this.mp_wash()
            }
        }
    }                        

    fix_char(){
        this.is_adding_int = false
        this.washes += this.INT - 4
        this.INT = 4
    }

    copy(): Player{
        const new_guy = new Player(this.job, this.name, this.maple_warrior_percent)
        new_guy.int_goal = this.int_goal
        new_guy.level = this.level
        new_guy.equipment = this.equipment
        new_guy.bonus_HP = this.bonus_HP
        new_guy.bonus_mana = this.bonus_mana
        new_guy.INT = this.INT
        new_guy.fresh_AP = this.fresh_AP
        new_guy.washes = this.washes
        new_guy.is_adding_int = this.is_adding_int
        new_guy.stale_ap = this.stale_ap
        new_guy.main_stat = this.main_stat
        new_guy.is_adding_fresh_ap_into_hp = this.is_adding_fresh_ap_into_hp
        new_guy.mp_washes = this.mp_washes
        new_guy.fresh_ap_into_hp_total = this.fresh_ap_into_hp_total 
        return new_guy
    }
    
    dump_model(){
        return {
            "level": this.level ,
            "int_goal": this.int_goal ,
            "bonus_HP": this.bonus_HP ,
            "bonus_mana": this.bonus_mana ,
            "INT": this.INT ,
            "maple_warrior_percent": this.maple_warrior_percent ,
            "fresh_AP": this.fresh_AP ,
            "washes": this.washes ,
            "is_adding_int": this.is_adding_int ,
            "stale_ap": this.stale_ap ,
            "name": this.name ,
            "job": this.job.name ,
            "main_stat": this.main_stat ,
            "is_adding_fresh_ap_into_hp": this.is_adding_fresh_ap_into_hp ,
            "mp_washes": this.mp_washes ,
            "fresh_ap_into_hp_total": this.fresh_ap_into_hp_total ,
            // "id": this.id
        }
    }

    toString(): string{
        return `name: ${this.name} job: ${this.job} lvl: ${this.level} base INT: ${this.INT} total INT: ${this.total_int} fresh ap: ${this.fresh_AP} bonus MP: ${this.bonus_mana} bonus HP: ${this.bonus_HP} total HP: ${this.health} reset scrolls: ${this.washes} cost: ${(this.washes) * 3300}nx`
    }
}