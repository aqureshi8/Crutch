import { v4 as uuidv4 } from 'uuid';

class TaskModel {
  static Status = Object.freeze({
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    FINISHED: "Finished",
  });

  static create(params) {
    if (!params) {
      params = {};
    }

    return {
        id: params.id ? params.id : uuidv4(),
        name: params.name ? params.name : "",
        date: params.date ? params.date : new Date(Date.now()),
        status: params.status ? params.status : TaskModel.Status.NOT_STARTED
    }
  }
}

export default TaskModel;