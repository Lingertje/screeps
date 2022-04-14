interface iRoleBuilder {
    run: (creep: Creep) => void 
}

var roleBuilder: iRoleBuilder = { 
    run: (creep) => {
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
            constructBuilding(creep);
        }
    }
}

const constructBuilding = (creep: Creep) => {
    const closestConstructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    
    if (closestConstructionSite) {
        if (creep.build(closestConstructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestConstructionSite, { visualizePathStyle: { stroke: '#000' }})
        }
    } else {
        creep.say("Nothing to build..");
        transferToStructure(creep);
    }
}

module.exports = roleBuilder;