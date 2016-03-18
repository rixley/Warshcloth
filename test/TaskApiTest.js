/* eslint-env mocha */
let sinon = require('sinon');
let assert = require('assert');
let Maybe = require('../lib/monad/Maybe').Maybe;
let TasksApi = require('../server/api/task');
let Repo = require('../server/repo/Repo');
let Task = require('../server/model/Task');

describe('Tasks api', () => {
    describe('POST', () => {
        it('should create tasks', () => {
            let req = { body: { desc: 'some task' } };
            let res = { json: sinon.spy() };
            let repo = new Repo();
            let mock = sinon
                .mock(repo)
                .expects('store')
                .once()
                .returns(Promise.resolve({}));

            return TasksApi.createTask(repo, req, res)
                .then(() => {
                    assert(res.json.calledOnce);
                    mock.verify();
                });
        });
    });

    describe('GET', () => {
        it('should get a task by id', () => {
            let repo = new Repo();
            let id = 'taskId';
            let req = { params: { id: id } };
            let res = { json: () => {} };
            let desc = 'desc';
            let taskJson = { id: id, desc: desc };
            let mockRes = sinon.mock(res).expects('json')
                .once()
                .withArgs(taskJson);
            let task = new Task(id, desc);
            let mock = sinon.mock(repo)
                .expects('query')
                .once()
                .withArgs(id)
                .returns(Promise.resolve(Maybe(task)));

            TasksApi.getTask(repo, req, res)
                .then(() => {
                    mock.verify();
                    mockRes.verify();
                });
        });

        it('should list all tasks', () => {
            let req = {};
            let res = { json: sinon.spy() };
            let repo = new Repo();
            let mock = sinon
                .mock(repo)
                .expects('find')
                .once()
                .returns(Promise.resolve([]));

            TasksApi.getTasks(repo, req, res)
                .then(() => {
                    assert(res.json.calledOnce);
                    mock.verify();
                });
        });
    });

    describe('DELETE', () => {
        it('should delete tasks by id', () => {
            let repo = new Repo();
            let taskId = 'mytaskid';
            let desc = 'desc';
            let task = new Task(taskId, desc);
            let mockQuery = sinon.mock(repo)
                .expects('query')
                .once()
                .withArgs(taskId)
                .returns(Promise.resolve(Maybe(task)));
            let mockDelete = sinon.mock(repo)
                .expects('delete')
                .once()
                .withArgs(taskId)
                .returns(Promise.resolve({}));
            let req = { params: { id: taskId } };
            let res = { json: sinon.spy() };

            return TasksApi.deleteTask(repo, req, res)
                .then(() => {
                    assert(res.json.calledOnce);
                    mockQuery.verify();
                    mockDelete.verify();
                });
        });
    });
});
