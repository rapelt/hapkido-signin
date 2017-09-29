import {Student} from '../../models/student';
import {Injectable, Inject} from '@angular/core';
import {Class} from '../../models/class';
import {Moment} from 'moment';
import * as moment from 'moment';
import {ClassData} from './class.data';
import {ClassEvents} from './class.events';
import {EnvVariables} from '../../app/enviroment/enviroment.token';
import * as _ from 'underscore';

@Injectable()
export class ClassService {
  private classes: Class[] = [];
  private todaysClasses: Class[] = [];

  constructor(private classData: ClassData, private classEvents: ClassEvents, @Inject(EnvVariables) public envVariables) {
    this.repeat();
  }

  createClass(){
  }

  setClasses(classes) {
    this.classes = classes;
  }

  setTodaysClasses(classes) {
    this.todaysClasses = classes;
  }

  getAllClasses(){
    this.classData.getAllClasses().subscribe((classList: Class []) => {
      classList.forEach((aclass)=>{
        aclass.date = moment(aclass.date);
      });
      this.setClasses(classList);
      this.classEvents.classesUpdated.next(this.classes);
    }, (error) => {
      console.log(error);
    });
  }

  getClass(){
  }

  getTodaysClasses(){
    this.classData.getTodaysClasses().subscribe((todaysClasses: Class []) => {
      todaysClasses.forEach((aclass)=>{
        aclass.date = moment(aclass.date);
      });
      this.setTodaysClasses(this.sortClasses(todaysClasses));
      this.classEvents.todaysClassesUpdated.next(this.todaysClasses);
    }, (error) => {
      console.log(error);
    });
  }

  updateClass() {
  }

  sortClasses(classes: Array<Class>) {
    return classes.sort((a, b) => {
      if (moment(a.date).isBefore(b.date)) {
        return -1;
      } else if (moment(a.date).isAfter(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getNextClass(classes: Array<Class>){
    let futureClasses = this.getFutureClasses(classes);
    return this.sortClasses(futureClasses)[0];
  }

  getFutureClasses(classes: Array<Class>){
    let futureClasses: Array<Class> = [];

    classes.forEach((aclass) => {
      if(moment(aclass.date).isAfter(moment.now())){
        futureClasses.push(aclass);
      }
    });
    return futureClasses;
  }

  getAllDates(classes): Array<Moment>{
    let dates: Array<Moment> = [];
    classes.forEach((aclass)=>{
        dates.push(aclass.date);
    });
    return dates;
  }


  addStudent(studentId: string, classId: string){
    this.classData.addStudentToClass(studentId, classId).subscribe(response => {
      this.getAllClasses();
    }, error => {
      console.log(error);
    });
  }

  removeStudent(studentId: string, classId: string) {
    this.classData.removeStudentFromClass(studentId, classId).subscribe(response => {
      this.getAllClasses();
    }, error => {
      console.log(error);
    });
  }

  repeat(){
    setInterval(() =>{
      this.getTodaysClasses();
    }, this.envVariables.getClassTime);
  }

}