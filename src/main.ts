interface CreepMemory {
    working: boolean
}

module.exports.loop = () => {
    for (const i in Game.creeps) {
        const creep: Creep = Game.creeps[i];
        const closestResource: Source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (creep.store.getFreeCapacity() > 0 && !creep.memory.working) {
            if (creep.harvest(closestResource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestResource, { visualizePathStyle: { stroke: '#000' }});
                return
            }
    
            creep.harvest(closestResource);
        } else {
            creep.memory.working = true;
        }

        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.working = false;
        }

        if (creep.memory.working) {
            transferToStructure(creep);
        }
    }
}

const transferToStructure = (creep: Creep) => {
    const structuresWithEnergyNeeds = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => ( structure.structureType === STRUCTURE_SPAWN ) && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY)
    });

    if (structuresWithEnergyNeeds.length) {
        if (creep.transfer(structuresWithEnergyNeeds[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structuresWithEnergyNeeds[0]);
            return;
        }

        creep.transfer(structuresWithEnergyNeeds[0], RESOURCE_ENERGY);
    } else {
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }

        creep.transfer(creep.room.controller, RESOURCE_ENERGY);
    }
}

// Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY], 'Harvester', {
//     memory: {
//         working: false
//     }
// })