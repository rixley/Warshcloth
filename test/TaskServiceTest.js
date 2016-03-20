/* eslint-env mocha */
let assert = require('assert');
let sinon = require('sinon');
let Maybe = require('../lib/monad/Maybe').Maybe;
let Task = require('../server/model/Task');
let TaskService = require('../server/service/TaskService');
let Repo = require('../server/repo/Repo');

describe('TaskService', () => {
    it('should store tasks with create', () => {
        let description = 'task description';
        let repo = new Repo();
        let mock = sinon.mock(repo)
            .expects('store')
            .once()
            .withArgs(sinon.match((task) => task.desc === description))
            .returns(Promise.resolve({}));

        TaskService.create(description).run(repo).then(() => mock.verify());
    });

    it('should fetch all tasks with find', () => {
        let repo = new Repo();
        let mock = sinon.mock(repo).expects('find').once();
        TaskService.getTasks().run(repo);
        mock.verify();
    });

    it('should find tasks by id', () => {
        let repo = new Repo();
        let id = 'taskId';
        let task = new Task(id, 'description');
        let mock = sinon
            .mock(repo)
            .expects('query')
            .once()
            .withArgs(id)
            .returns(Maybe(task));
        let found = TaskService.getTask(id).run(repo);
        assert.equal(found.get(), task);
        mock.verify();
    });

    it('should delete tasks by id', () => {
        let taskId = 'mytaskid';
        let repo = new Repo();
        let mock = sinon.mock(repo).expects('delete').once();

        TaskService.delete(taskId).run(repo);
        mock.verify();
    });
});
