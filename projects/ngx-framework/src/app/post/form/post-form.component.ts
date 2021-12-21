import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostStore } from '../post.store';
import { IPost } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare type FormType = 'field' | 'form-group' | 'display-error';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostFormComponent implements OnInit {

  public loading = false;
  public form!: FormGroup;
  public post$: Observable<IPost[]> = this._store.posts$;

  /**
   * CONSTRUCTOR
   * @param _formBuilder: FormBuilder
   * @param _store: PostStore
   * @param _breadcrumbService: NgxBreadcrumbService
   * @param _router: Router
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _store: PostStore,
    private _breadcrumbService: NgxBreadcrumbService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.loading = true; }, 1500);

    this.form = this._formBuilder.group({
      body: new FormControl('', [
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

    this._breadcrumbService.add('post-breadcrumb', 'Post', '/post', 1);
    this._breadcrumbService.add('post-form-breadcrumb', 'Create', '/post/create', 2);
  }

  /**
   * Reset post component
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
      const response: Observable<IPost> = this._store.create({
        body: this.form.get('body')?.value,
        title: this.form.get('title')?.value,
        userId: this._store.userId
      } as IPost);

      response.subscribe(
        (post: IPost) => this._router.navigateByUrl('/post'),
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
