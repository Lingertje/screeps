var roleWorker: iRoleWorker = require('role.worker');
var roleBuilder: iRoleBuilder = require('role.builder');

enum Role { 
    WORKER = "worker",
    BUILDER = "builder"
}
interface CreepMemory {
    role?: Role
    working?: boolean
}

module.exports.loop = () => {
    for (const i in Game.creeps) {
        const creep: Creep = Game.creeps[i];

        if (creep.memory.role === Role.WORKER) {
            roleWorker.run(creep)
        }

        if (creep.memory.role === Role.BUILDER) {
            roleBuilder.run(creep);
        }
    }

    // @ts-ignore
    if (_(Game.creeps).filter({ memory: {role: Role.WORKER}}).size() < 4) {
        spawnCreep(Role.WORKER);
    }

    // @ts-ignore
    if (_(Game.creeps).filter({ memory: {role: Role.BUILDER}}).size() < 2) { // TODO: Check if controller level is atleast 2 
        spawnCreep(Role.BUILDER, [WORK, WORK, MOVE, MOVE, CARRY, CARRY]);
    }
}

const spawnCreep = (role: Role, body = [WORK, MOVE, CARRY]) => {
    const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const name = `${role}_${randomNumber}`;

    Game.spawns['Spawn1'].spawnCreep(body, name, {
        memory: {
            role,      
            working: false
        }
    })
}

