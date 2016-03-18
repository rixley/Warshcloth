'use strict';
/**
 * Represents a task
 */
class Task {
    /**
     * @param {string} id the task id
     * @param {string} desc the task description
     */
    constructor(id, desc) {
        this.id = id;
        this.desc = desc;
    }

    /**
     * Returns the given task as json
     * @param {Task}
     * @return {Object}
     */
    static toJson(task) {
        return {
            id: task.id,
            desc: task.desc
        };
    }
}
module.exports = Task;
