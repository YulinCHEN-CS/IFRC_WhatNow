const { Content } = require('./content.model');

class Societies {
    constructor() {
        this.society_names = ['Austrian Red Cross', 'British Red Cross', 'Canadian Red Cross', 'Danish Red Cross', 'Finnish Red Cross', 'French Red Cross', 'German Red Cross', 'Italian Red Cross', 'Japanese Red Cross', 'Korean Red Cross', 'Netherlands Red Cross', 'Norwegian Red Cross', 'Spanish Red Cross', 'Swedish Red Cross', 'Swiss Red Cross', 'American Red Cross', 'IFRC' ];
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

const societies = new Societies().society_contents;
// console.log(societies);
module.exports = {
    societies
};