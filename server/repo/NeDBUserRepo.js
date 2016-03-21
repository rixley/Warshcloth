'use strict';
let NeDBRepo = require('./NeDBRepo');
let User = require('../model/User');

class NeDBUserRepo extends NeDBRepo {
    store(user) {
        let userDoc = User.toJson(user);
        return new Promise((resolve, reject) => {
            this.db.insert(userDoc, (err, newDoc) => {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    }
}
module.exports = NeDBUserRepo;
