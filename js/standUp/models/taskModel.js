import { v4 as uuidv4 } from 'uuid';

class TaskModel {
  static Status = Object.freeze({
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    FINISHED: "Finished",
  });

  constructor(params) {
    if (!params) {
      params = {};
    }

    this.id = params.id ? params.id : uuidv4();
    this.name = params.name ? params.name : "";
    this.date = params.date ? params.date : new Date(Date.now());
    this.Status = params.status ? params.status : TaskModel.Status.NOT_STARTED;
  }
}

export default TaskModel;