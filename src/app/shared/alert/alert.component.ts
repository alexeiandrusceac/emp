import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription!: Subscription | undefined;
  message: any;
  public isVisible: boolean;

  @Input()
  public iconClass: string | string[];

  @Output()
  public visibleChange: EventEmitter<boolean>;

  constructor(private alertService: AlertService) {
    this.isVisible = true;
    this.visibleChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe((message: { type: any; cssClass: string; }) => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'info':
            message.cssClass = 'alert alert-info';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  @Input()
  public set visible(value: boolean) {
    this.isVisible = value;
  }

  public get visible(): boolean {
    return this.isVisible;
  }

  public dismiss(): void {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }
}
