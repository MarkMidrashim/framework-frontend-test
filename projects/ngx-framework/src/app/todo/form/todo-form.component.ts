import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TodoStore } from '../todo.store';
import { ITodo } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

declare type FormType = 'field' | 'form-group' | 'display-error';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoFormComponent implements OnInit {

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
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.loading = true; }, 1500);

    this._route.params.subscribe(params => {
      this._store.only(params['id']);
    });

    this.form = this._formBuilder.group({
      completed: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]),
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
