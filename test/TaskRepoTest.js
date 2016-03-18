/* eslint-env mocha */
let assert = require('assert');
let NeDBTaskRepo = require('../server/repo/NeDBTaskRepo');
let Task = require('../server/model/Task');

describe('Task repo', () => {
    let config = { autoload: true };

    it('should create, read, delete, and list tasks', () => {
        let repo = new NeDBTaskRepo(config);
        let taskId = 'taskId';
        let desc = 'description';
        let task = new Task(taskId, desc);
        return repo.store(task).then(() => {
            return repo.find();
        }).then((found) => {
            assert.deepEqual(found[0], task);
            return repo.query(task.id);
        }).then((found) => {
            assert.deepEqual(found.get(), task);
            return repo.delete(task.id);
        });
    });
});
