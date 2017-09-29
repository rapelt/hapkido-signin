import {Component, Inject, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnvVariables } from '../../app/enviroment/enviroment.token';
import {StudentService} from '../../services/student/student.service';
import {StudentEvents} from '../../services/student/student.events';
import {Student} from '../../models/student';
import {Class} from '../../models/class';
import {ClassService} from '../../services/class/class.service';
import {ClassEvents} from '../../services/class/class.events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  title: string = 'Home';
  environment: string = '';
  student: Student = null;
  todaysClasses: Array<Class> = null;

  constructor(public navCtrl: NavController,
              @Inject(EnvVariables) public envVariables,
              public studentService: StudentService,
              public studentEvents: StudentEvents,
              public classService: ClassService,
              public classEvents: ClassEvents) {
  }

  ngOnInit(){
    this.environment = this.envVariables.environmentName;
    this.classService.getTodaysClasses();

    this.studentEvents.studentUpdated.subscribe((student: Student) => {
      this.student = student;
      console.log(this.student);
    });

    this.classEvents.todaysClassesUpdated.subscribe((todaysClasses: Array<Class>) => {
      this.todaysClasses = todaysClasses;
    });

  }

  changeTitle(title){
    this.title = title;
  }

  signIn(studentNumber){
    console.log(studentNumber);
    this.studentService.getStudent(studentNumber);
  }

  signOut(){
    this.classService.getTodaysClasses();
    this.student = null;
  }

}
