function randomInt(min, max) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // max is exclusive, minimum is inclusive
}

function momentBuilder(moment) {
    return `That was a **${moment}** moment!`;
}

module.exports.randomInt = randomInt;
module.exports.momentBuilder = momentBuilder;
