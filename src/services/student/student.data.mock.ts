import {Student} from "../../models/student";
import {Observable} from "rxjs";
import {Name} from "../../models/name";
export class StudentDataMock {

    static students: Student[] = [new Student(new Name('rebekah', 'apelt'), 'hb030', '0000', 2, true, [], [], true, 'Adults'), new Student(new Name('mark', 'higgins'), 'hb031', '0000', 2, true, [], [], false, 'Adults')];
    userUrl: string = 'http://localhost/dev/student/';

    getStudent(hbid: string): Observable<Student> {
        return Observable.of(StudentDataMock.students[0]);
    }

    getAllStudents(): Observable<Student []> {
        return Observable.of(StudentDataMock.students);
    }

}