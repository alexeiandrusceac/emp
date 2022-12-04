import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../interfaces/user'
import {UserService} from '../../services/user.service'
import {map} from 'rxjs'
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {AlertService} from '../../services/alert.service'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  disabled = true;
  @Input() user: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  dataSource: any;
  hasChanges = false;
  displayedColumns: string[] = ['title', 'name', 'surname', 'email', 'address', 'phone'];
  value!: string;
  pageSizeOptions = [5, 10, 25];
  showPageSizeOptions = true;
  formGroup: FormGroup;
  listOfUsers: User[] = [];
  currIndex: number;

  constructor(private userService: UserService, private fb: FormBuilder, private alertService: AlertService, private router: Router) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      rows: this.fb.array([])
    });
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((x: any) => ({
            id: x.payload.doc.id,
            ...x.payload.doc.data()
          })
        )
      )).subscribe((data: User[]) => {
        this.formGroup = this.fb.group({

        rows: this.fb.array(data.map((val: any) => this.fb.group({
            id: this.fb.control(val.id),
            title: this.fb.control(val.title),
            name: this.fb.control(val.name),
            surname: this.fb.control(val.surname),
            address: this.fb.control(val.address),
            email: this.fb.control(val.email),
            phone: this.fb.control(val.phone),
            agree: this.fb.control(val.agree),
            password: this.fb.control(val.password),
            isEditable: this.fb.control(true),
            isNew: this.fb.control(false)
          })
        ))
      });
      this.dataSource = new MatTableDataSource((this.formGroup.get('rows') as FormArray).controls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.pageSizeOptions = this.pageSizeOptions;
      const filterPredicate = this.dataSource.filterPredicate;
      this.dataSource.filterPredicate = (data: AbstractControl, filter: any) => {
        return filterPredicate.call(this.dataSource, data.value, filter);
      }
    })

    this.displayedColumns.push('action')
  }

  deleteUser(i: any) {
    this.userService.delete((this.formGroup.get('rows') as FormArray).at(i).get('id')?.value).then(() => {
      this.refreshList.emit();
      this.alertService.showMessage('error', 'User has been deleted succesfully!');
      (this.formGroup.get('rows') as FormArray).removeAt(i);
    });

  }

  updateUser(i: any) {
    (this.formGroup.get('rows') as FormArray).at(i).get('isEditable')?.patchValue(false);
  }

  saveUser(i: any) {

    this.disabled = false;
    this.userService.updateUser((this.formGroup.get('rows') as FormArray).at(i).value).then(() => {
      this.refreshList.emit();
      this.alertService.showMessage('info', 'User has been updated succesfully!');
      (this.formGroup.get('rows') as FormArray).at(i).get('isEditable')?.patchValue(true);
    })

  }

  viewUser(i: any) {

    this.router.navigate(['/user-view', {id: (this.formGroup.get('rows') as FormArray).at(i).value}]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearData() {
    this.value = '';
    this.dataSource.filter = '';
  }
}
