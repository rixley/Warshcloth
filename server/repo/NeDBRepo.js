'use strict';
let Repo = require('./Repo');
let Datastore = require('nedb');

class NeDBRepo extends Repo {
    constructor(config) {
        super();

        this.db = new Datastore(config);
    }
}
module.exports = NeDBRepo;
