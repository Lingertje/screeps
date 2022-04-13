module.exports.loop = function () {
    for (var i in Game.creeps) {
        var creep = Game.creeps[i];
        var closestResource = creep.pos.findClosestByPath(FIND_SOURCES);
        // @ts-expect-error
        if (creep.store.getFreeCapacity() > 0 && !creep.memory.working) {
            if (creep.harvest(closestResource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestResource);
                return;
            }
            creep.harvest(closestResource);
        }
        else {
            // @ts-expect-error
            creep.memory.working = true;
        }
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            // @ts-expect-error
            creep.memory.working = false;
        }
        // @ts-expect-error
        if (creep.memory.working) {
            transferToStructure(creep);
        }
    }
};
var transferToStructure = function (creep) {
    var structuresWithEnergyNeeds = creep.room.find(FIND_STRUCTURES, {
        filter: function (structure) { return (structure.structureType === STRUCTURE_SPAWN) && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY); }
    });
    if (structuresWithEnergyNeeds.length) {
        if (creep.transfer(structuresWithEnergyNeeds[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structuresWithEnergyNeeds[0]);
            return;
        }
        creep.transfer(structuresWithEnergyNeeds[0], RESOURCE_ENERGY);
    }
    else {
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        creep.transfer(creep.room.controller, RESOURCE_ENERGY);
    }
};
