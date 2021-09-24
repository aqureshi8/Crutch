import { v4 as uuidv4 } from 'uuid';

class StandUpModel {
  static create(date) {
    this.create(undefined, date, undefined);
  }

  static create(id =  uuidv4(), date = new Date(Date.now()), tasks = []) {
    return {id: id, date: date, tasks: tasks}
  }
}

export default StandUpModel;