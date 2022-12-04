import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              this.keepAfterRouteChange = false;
          } else {
              this.clear();
          }
      }
    });
   }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  showMessage(type: string, message: string,  keepAfterRouteChange = false){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: type, text: message });
  }

clear() {
  this.subject.next({ });
}
}
