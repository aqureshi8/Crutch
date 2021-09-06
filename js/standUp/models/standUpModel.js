import StandUp from "../standUp";
import { v4 as uuidv4 } from 'uuid';


class StandUpModel {
  constructor(params) {
    if (!params) {
      params = {};
    }

    this.id = params.id ? params.id : uuidv4();
    this.date = params.date ? params.date : new Date(Date.now());
    this.tasks = params.tasks ? params.tasks : [];
  }
}

export default StandUpModel;