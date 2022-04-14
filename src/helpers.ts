const transferToStructure = (creep: Creep) => {
    const structuresWithEnergyNeeds = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => ( structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION ) 
            && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY)
    });

    if (structuresWithEnergyNeeds.length) {
        if (creep.transfer(structuresWithEnergyNeeds[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structuresWithEnergyNeeds[0], { visualizePathStyle: { stroke: '#fff' }});
        }
    } else {
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#fff' }});
        }
    }
}

module.exports = {
    transferToStructure
}