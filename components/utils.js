const replyData = require('../data/replyData.json');

function randomInt(min, max) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // max is exclusive, minimum is inclusive
}

function momentBuilder(acronym) {
    const starts = replyData.data.starts;
    const randStart = starts[randomInt(0, starts.length)];

    const ends = replyData.data.ends;
    const randEnd = ends[randomInt(0, ends.length)];

    const adjs = replyData.data.adjectives;
    const randAdjective = adjs[acronym[0]][randomInt(0, adjs[acronym[0]].length)];

    const people = replyData.data.people;
    const randPerson = people[acronym[1]][randomInt(0, people[acronym[1]].length)];
    
    const moment = randAdjective + ' ' + randPerson;
    return `${randStart} a **${moment}** moment${randEnd}`;
}

module.exports.randomInt = randomInt;
module.exports.momentBuilder = momentBuilder;
