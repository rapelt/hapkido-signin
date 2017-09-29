import {Subject} from "rxjs";

export class StudentEvents {
  studentsUpdated = new Subject();
  studentUpdated = new Subject();
}