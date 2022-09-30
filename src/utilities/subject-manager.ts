import { Subject } from "rxjs";

export class SubjectManager<T> {
  subject$ = new Subject();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: T) {
    this.subject$.next(value);
  }
}

export const sharingInformationService = new SubjectManager<boolean>();
