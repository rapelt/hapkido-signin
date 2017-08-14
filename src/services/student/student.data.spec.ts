import {TestBed, inject} from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudentData} from "./student.data";
import {Name} from "../../models/name";
import {Student} from "../../models/student";
import {EnvironmentsModule} from "../../app/enviroment/enviroment.module";

describe('Student Data', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, EnvironmentsModule],
      providers: [
        StudentData,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  const name: Name = new Name('rebekah', 'apelt');
  const rebekah = new Student(name, 'hb030', '0000', 2, true, [], [], true, 'Adults');

  it('getStudent should return an Observable<Student>',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = rebekah;

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.getStudent().subscribe((student) => {
        expect(student.name.firstname).toBe('rebekah');
      });
    })
  );

  it('getAllStudents should return an Observable<Array<Student>>',
    inject([StudentData, XHRBackend], (studentData, mockBackend) => {

      const mockResponse = [rebekah];

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      studentData.getAllStudents().subscribe((students) => {
        expect(students.length).toBe(1);
        expect(students[0].name.firstname).toBe('rebekah');
      });
    }));

});