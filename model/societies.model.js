const Content  = require('./content.model');

class Societies {
    constructor() {
        this.society_names = ['Austrian Red Cross', 'British Red Cross', 'Canadian Red Cross', 'ifrc all' ];
        this.society_contents = {}
        this.society_names.forEach((society) => {
            this.society_contents[society] = new Content(society);
        });
    }

    add_society(society_name) {
        this.society_names.push(society_name);
        this.society_contents[society_name] = new Content(society_name);
    }
}

async function createSocieties() {
    const new_societies = new Societies();
    for (const society of Object.values(new_societies.society_contents)) {
        await society.init();
    }
    return new_societies;
}

const societies = createSocieties().then((result) => {
    // console.log(result.society_contents);
    return result.society_contents;
});
module.exports = societies;

