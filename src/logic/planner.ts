import { EquipmentI } from "../interfaces/equipment";
import { MAGE_BASE_HP } from "./job";
import { Player } from "./player";

const MAX_INT = 900;  // how high will the planner go with base int
const MIN_INT = 20;  // INT starting point for the calculator, if it's under 20 my planner logic breaks, so 20 is the lowest
const BASE_INT_INCREMENT = 10;  // base int increments will be in 10 because mp washing yields different results only in increments of 10
const LOWEST_MP_WASHING_LEVEL = 50; // it doesn't make sense to start mp washing so early so i limited it to level 50+


export function do_the_stuff(player: Player, intGears: EquipmentI[], levelGoal: number, hpGoal: number): [number, number, number, number, boolean, number] {
    console.log('+++++++++++++ ', levelGoal, hpGoal)
    player = player.copy();
    let baseInt = MIN_INT;
    let success = false;
    player.reset_player();
    player.int_goal = baseInt;
    player.progress(levelGoal - 1, intGears);
    player.hp_wash(hpGoal);

    while (player.fresh_AP > 0 && player.health < hpGoal) {
        player.mp_wash(1);
        player.hp_wash(hpGoal);
    }

    let mpWashes = player.mp_washes;
    let totalWashes = player.washes;

    console.log(`ok so the first run cost ${mpWashes} mana washes, hp reached was ${player.health}`);
    player.fix_char();
    let minTotalCost = player.washes - totalWashes;
    let minMpWashes = mpWashes;
    let minBaseInt = baseInt;
    let minTotalWashes = totalWashes;
    let maxHp = player.health;

    while (baseInt < MAX_INT) {
        baseInt += BASE_INT_INCREMENT;
        player.int_goal = baseInt;
        player.reset_player();
        player.progress(levelGoal - 1, intGears);
        player.hp_wash(hpGoal);

        while (player.fresh_AP > 0 && player.health < hpGoal) {
            player.mp_wash(1);
            player.hp_wash(hpGoal);
        }

        mpWashes = player.mp_washes;
        totalWashes = player.washes;
        if (player.health < hpGoal) {
            console.log(`${baseInt}INT: i have failed HP reached was: ${player.health}`);
        } else {
            success = true;
            console.log(`${baseInt}INT: i have succeeded HP reached was: ${player.health}`);
        }
        player.fix_char();
        let totalCost = player.washes - totalWashes;
        console.log(`${player.name} with ${baseInt} INT: total cost of washes ${totalCost}`);
        if ((maxHp < player.health && player.health < hpGoal) || (totalCost < minTotalCost && maxHp <= player.health)) {
            minTotalWashes = totalWashes;
            minTotalCost = totalCost;
            minMpWashes = mpWashes;
            minBaseInt = baseInt;
            maxHp = player.health;
        }
    }

    player.int_goal = minBaseInt;
    player.reset_player();
    player.progress(levelGoal - 1, intGears);
    player.hp_wash(hpGoal);

    while (player.fresh_AP > 0 && player.health < hpGoal) {
        player.mp_wash(1);
        player.hp_wash(hpGoal);
    }

    player.fix_char();
    let bestHealth = player.health;
    console.log(`[${player.name}] i have found the best base int: ${minBaseInt} and it is accompanied by ${minMpWashes} points into MP and ${minTotalWashes - minMpWashes} Washes`);

    return [minBaseInt, minMpWashes, bestHealth, player.washes, success, player.fresh_ap_into_hp_total];
}

export function reach_the_goal_no_matter_what(player: Player, intGears: EquipmentI[], levelGoal: number, hpGoal: number): [number, number, number, number, boolean, number, number] {
    let [baseInt, pointsIntoMp, bestHealth, washes, success, freshApIntoHpTotal] = do_the_stuff(player, intGears, levelGoal, hpGoal);

    if (success) {
        return [baseInt, pointsIntoMp, bestHealth, washes, success, freshApIntoHpTotal, baseInt];
    } else {
        const missingHealth = hpGoal - bestHealth;
        const missingMp = Math.floor(missingHealth / player.job.base_hp_gain) * player.job.mp_cost;
        let mpWashStartingInt = baseInt;
        let generatedMp = 0;

        while (mpWashStartingInt > (LOWEST_MP_WASHING_LEVEL + freshApIntoHpTotal) && generatedMp < missingMp) {
            mpWashStartingInt -= 1;
            pointsIntoMp += 1;
            washes += 1;
            generatedMp += (mpWashStartingInt / 10 - 2);
        }

        washes += Math.floor(generatedMp / player.job.mp_cost);
        bestHealth += Math.floor(generatedMp / player.job.mp_cost) * player.job.base_hp_gain;
        success = generatedMp >= missingMp;

        console.log(`missing mp ${missingMp} missing hp ${missingHealth} generated_mp ${generatedMp} generated hp ${Math.floor(generatedMp / player.job.mp_cost) * player.job.base_hp_gain}`);

        return [baseInt, pointsIntoMp, bestHealth, washes, success, freshApIntoHpTotal, mpWashStartingInt];
    }
}

export function mageMpWashPlanner(player: Player, intGears: EquipmentI[], levelGoal: number, mpGoal: number): [number, number, number, boolean] {
    let startLevel = 20;
    const levelIncrement = 1;
    player = player.copy();
    let success = false;
    player.reset_player();
    player.int_goal = 1100;
    player.progress(startLevel, intGears);
    player.is_mp_wash_before_int = true;

    while (player.level < levelGoal) {
        if (player.level < startLevel) {
            player.is_mp_wash_before_int = true;
        }
        player.progress(1, intGears);
        if (player.mana >= mpGoal) {
            success = true;
            player.is_mp_wash_before_int = false;
        }
    }

    let idealMpWashes = player.mp_washes;
    let idealStartLevel = startLevel;
    let idealTotalMana = player.mana;

    while (startLevel < levelGoal) {
        let subSuccess = false;
        player.reset_player();
        player.progress(startLevel, intGears);
        player.is_mp_wash_before_int = true;

        while (player.level < levelGoal) {
            player.progress(1, intGears);
            if (player.mana >= mpGoal) {
                success = true;
                subSuccess = true;
                player.is_mp_wash_before_int = false;
            }
        }

        if (subSuccess) {
            idealMpWashes = player.mp_washes;
            idealStartLevel = startLevel;
            idealTotalMana = player.mana;
        }
        startLevel += levelIncrement;
    }

    console.log(`[${player.name}] final results are ${success} starting level: ${idealStartLevel} washes: ${idealMpWashes} total mana: ${idealTotalMana}`);

    return [idealStartLevel, idealMpWashes, idealTotalMana, success];
}

export function mageHpWashPlanner(player: Player, intGears: EquipmentI[], levelGoal: number, hpGoal: number, mpGoal: number): [number, number, number, number, boolean] {
    if (hpGoal === 0) {
        let [startLevel, mpWashes, totalMana, isSuccessful] = mageMpWashPlanner(player, intGears, levelGoal, mpGoal);
        return [startLevel, mpWashes, MAGE_BASE_HP[levelGoal], totalMana, isSuccessful]
    }
    const baseHealthAtGoal = player.job.base_hp[levelGoal - 1];
    const bonusManaNeeded = Math.floor((hpGoal - baseHealthAtGoal) / 6) * 30;

    console.log(`planning to hp wash mage will need: ${bonusManaNeeded} bonus mana`);

    let [startLevel, mpWashes, totalMana, isSuccessful] = mageMpWashPlanner(player, intGears, levelGoal, mpGoal + bonusManaNeeded);

    let pointsResetFromMpToHp: number;

    if (isSuccessful) {
        pointsResetFromMpToHp = Math.floor((hpGoal - baseHealthAtGoal) / 6);
    } else {
        pointsResetFromMpToHp = Math.floor((totalMana - mpGoal) / 30);
    }

    console.log();
    const totalWashes = pointsResetFromMpToHp + mpWashes;
    const totalHp = baseHealthAtGoal + pointsResetFromMpToHp * 6;
    totalMana -= pointsResetFromMpToHp * 30;

    return [startLevel, totalWashes, totalHp, totalMana, isSuccessful];
}