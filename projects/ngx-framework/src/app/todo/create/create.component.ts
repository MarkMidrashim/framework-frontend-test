import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TodoStore } from '../todo.store';
import { ITodo } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormType } from '@framework-lib/ngx-domain';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

  public loading = false;
  public form!: FormGroup;
  public todo$: Observable<ITodo[]> = this._store.todos$;

  /**
   * CONSTRUCTOR
   * @param _formBuilder: FormBuilder
   * @param _store: TodoStore
   * @param _breadcrumbService: NgxBreadcrumbService
   * @param _router: Router
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _store: TodoStore,
    private _breadcrumbService: NgxBreadcrumbService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.loading = true; }, 1500);

    this.form = this._formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]),
      completed: new FormControl('', [
        Validators.required
      ])
    });

    this._breadcrumbService.add('todo-breadcrumb', 'Todo', '/todo', 1);
    this._breadcrumbService.add('todo-form-breadcrumb', 'Create', '/todo/create', 2);
  }

  /**
   * Reset todo component
   */
  reset(): void {
    this.form.reset();
    this._store.reset();
  }

  /**
   * Submit
   */
  submit(): void {
    if (this.form.valid) {
      const response: Observable<ITodo> = this._store.create({
        title: this.form.get('title')?.value,
        completed: this.form.get('completed')?.value,
        userId: this._store.userId
      } as ITodo);

      response.subscribe(
        (todo: ITodo) => this._router.navigateByUrl('/todo'),
        (error: Error) => Swal.fire('Erro!', error?.message, 'error')
      );
    }
  }

  /**
   *
   * @param field: string
   * @returns
   */
  private isFieldValid(field: string): boolean | undefined {
    return !this.form.get(field)?.valid;
  }

  /**
   *
   * @param field: string
   * @param type: FormType
   * @returns
   */
  displayFieldCss(field: string, type: FormType) {
    switch(type) {
      case 'field':
        return {'is-invalid': this.isFieldValid(field)};
      case 'form-group':
        return {'has-danger': this.isFieldValid(field)};
      case 'display-error':
        return {'has-feedback': this.isFieldValid(field)};
    }
  }

}
