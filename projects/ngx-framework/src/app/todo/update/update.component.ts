import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TodoStore } from '../todo.store';
import { ITodo } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable, ReplaySubject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { FormType } from '@framework-lib/ngx-domain';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateComponent implements OnInit {

  public id: number = 0;
  public todo!: ITodo;

  public loading = false;
  public form!: FormGroup;
  public todos$: Observable<ITodo[]> = this._store.todos$;
  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * CONSTRUCTOR
   * @param _formBuilder: FormBuilder
   * @param _store: TodoStore
   * @param _breadcrumbService: NgxBreadcrumbService
   * @param _router: Router
   * @param _route: ActivatedRoute
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _store: TodoStore,
    private _breadcrumbService: NgxBreadcrumbService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this._route.snapshot.params.id;
    this._store.fetch({'id': this.id.toString()});

    this.form = this._formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]),
      completed: new FormControl('', [
        Validators.required
      ]),
    });

    this.prepare();
    this._breadcrumbService.add('todo-breadcrumb', 'Todo', '/todo', 1);
    this._breadcrumbService.add('todo-form-breadcrumb', 'Update', '/todo/update', 2);
  }

  private prepare(): void {
    if (this.id != 0) {
      this.todos$?.pipe(
        takeUntil(this.destroy$),
        filter((todo: ITodo[]) => todo !== undefined)
      ).subscribe((todo: ITodo[]) => {
        this.todo = todo[0];
        this.loading = true;
      });

      this.form.get('completed')?.setValue(this.todo?.completed);
      this.form.get('title')?.setValue(this.todo?.title);
    } else {
      Swal.fire({
        title: 'Página Indisponível!',
        text: 'Ocorreu um erro ao acessar página!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigateByUrl('/todo');
        }
      })
    }
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
      const response: Observable<ITodo> = this._store.update({
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
