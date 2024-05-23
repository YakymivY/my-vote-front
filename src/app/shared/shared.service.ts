import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private showAlertSubject = new Subject<string>();
  showAlert$ = this.showAlertSubject.asObservable();

  triggerShowAlert(msg: any) {
    this.showAlertSubject.next(msg);
  }

}
