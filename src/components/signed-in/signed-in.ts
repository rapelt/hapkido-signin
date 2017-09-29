import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../../models/student';
import {Class} from '../../models/class';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {Moment} from 'moment';
import * as _ from "underscore";
import {ClassService} from '../../services/class/class.service';



@Component({
  selector: 'signed-in',
  templateUrl: 'signed-in.html'
})

export class SignedInComponent implements OnInit{

  @Input()
  student: Student;

  @Input()
  todaysClasses: Array<Class>;

  @Output()
  signOut: EventEmitter<string> = new EventEmitter();

  signedInForm: FormGroup;


  constructor(private _fb: FormBuilder, private classService: ClassService){
    console.log('Yay');
  }

  ngOnInit(){
    this.initaliseForm();
  }

  initaliseForm() {
    this.signedInForm = this._fb.group({
      classes: this._fb.array([])
    });

    _.each(this.todaysClasses, (aclass: Class)=>{
      this.addClass(_.contains(aclass.attendance, this.student.hbId));
    });
  }

  initClass(isAttending) {
    return this._fb.group({
      attended: [isAttending],
    });
  }

  addClass(isAttending) {
    const control = <FormArray>this.signedInForm.controls['classes'];
    control.push(this.initClass(isAttending));
  }

  onSignOut(){
    this.signOut.emit();

  }

  onButtonClick(index){
    const currentAttendance =(<FormGroup>(<FormGroup>this.signedInForm.controls['classes']).controls[index]).controls['attended'].value;
    if(!currentAttendance){
      this.classService.addStudent(this.student.hbId, this.todaysClasses[index].classId);
    } else {
      this.classService.removeStudent(this.student.hbId, this.todaysClasses[index].classId);
    }
  }
}
