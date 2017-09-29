import {Student} from "../../models/student";
import {Injectable} from "@angular/core";
import {StudentData} from "./student.data";
import {StudentEvents} from "./student.events";
import * as _ from "underscore";

@Injectable()
export class StudentService {
  private students: Student[] = [];
  private student: Student;

  constructor(private studentData: StudentData, private studentEvents: StudentEvents) {}

  getStudents(){
    return this.students;
  }

  getAllStudents(){
    this.studentData.getAllStudents().subscribe((studentsList: Student []) => {
      this.students = studentsList;
      this.studentEvents.studentsUpdated.next(this.students);
    }, (error) => {
      console.log(error);
    });
  }

  getStudent(hbid: string){
    this.studentData.getStudent(hbid).subscribe((student: Student) => {
      this.student = student;
      this.studentEvents.studentUpdated.next(this.student);
    }, (error) => {
      console.log(error);
    });
  }

  getStudentsActiveState(studentList){
    let active: any;

    active = _.partition(studentList, (student) =>{
      return student.isActive || student.isActive == null;
    });

    return active;
  }

}