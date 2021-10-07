import { v4 as uuidv4 } from 'uuid';

class ToDoListModel {
  static create(externalId =  uuidv4(), date = new Date(Date.now()), tasks = []) {
    return {
      externalId: externalId,
      date: date,
      tasks: tasks
    };
  }

  static createWithDate(date) {
    return this.create(undefined, date, undefined);
  }
}

export default ToDoListModel;