var helpers = require('./helpers');

interface iRoleWorker {
    run: (creep: Creep) => void 
}

var roleWorker: iRoleWorker = { 
    run: (creep) => {
        const closestResource: Source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (creep.store.getFreeCapacity() > 0 && !creep.memory.working) {
            if (creep.harvest(closestResource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestResource, { visualizePathStyle: { stroke: '#000' }});
            }
        } else {
            creep.memory.working = true;
        }

        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.working = false;
        }

        if (creep.memory.working) {
            helpers.transferToStructure(creep);
        }
    }
}

module.exports = roleWorker;