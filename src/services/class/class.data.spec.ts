import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ClassData} from "./class.data";
import {Class} from "../../models/class";
import * as moment from "moment";
import {EnvironmentsModule} from "../../app/enviroment/enviroment.module";

describe('Class Data', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        ClassData,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });
  const aclass = new Class("123", "", [], false, moment(), "");

  it('getAllClasses should return an Observable<Array<Class>>',
    inject([ClassData, XHRBackend], (classData, mockBackend) => {

      const mockResponse = [aclass];

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      classData.getAllClasses().subscribe((classes) => {
        expect(classes.length).toBe(1);
      });

    }));

  it('getClass should return an Observable<Class>',
    inject([ClassData, XHRBackend], (classData, mockBackend) => {

      const mockResponse = aclass;

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      classData.getClass("class1").subscribe((aclass) => {
        expect(aclass.classId).toBe("123");
      });

    }));
});