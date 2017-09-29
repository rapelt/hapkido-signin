import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StudentData} from '../services/student/student.data';
import {HttpModule} from '@angular/http';
import {GradeService} from '../services/grade.service';
import {StudentEvents} from '../services/student/student.events';
import {StudentService} from '../services/student/student.service';
import {ClassService} from '../services/class/class.service';
import {ClassData} from '../services/class/class.data';
import {ClassEvents} from '../services/class/class.events';
import {AttendanceService} from '../services/attendance.service';
import {EnvironmentsModule} from './enviroment/enviroment.module';
import { SignInFormComponent } from '../components/sign-in-form/sign-in-form';
import {AuthService} from '../services/auth/auth.service';
import { SignedInComponent } from '../components/signed-in/signed-in';
import { ErrorComponent } from '../components/error/error';
import {ErrorEvents} from '../services/error.events';
import { AttendanceComponent } from '../components/attendance/attendance';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInFormComponent,
    SignedInComponent,
    ErrorComponent,
    AttendanceComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentData,
    StudentEvents,
    StudentService,
    GradeService,
    ClassService,
    ClassData,
    ClassEvents,
    AttendanceService,
    AuthService,
    ErrorEvents
  ]
})
export class AppModule {}
