import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlbumStore } from '../album.store';
import { IAlbum } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormType } from '@framework-lib/ngx-domain';

@Component({
  selector: 'app-create-album',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

  public loading = false;
  public form!: FormGroup;
  public album$: Observable<IAlbum[]> = this._store.albums$;

  /**
   * CONSTRUCTOR
   * @param _formBuilder: FormBuilder
   * @param _store: AlbumStore
   * @param _breadcrumbService: NgxBreadcrumbService
   * @param _router: Router
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _store: AlbumStore,
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
    });

    this._breadcrumbService.add('album-breadcrumb', 'Album', '/album', 1);
    this._breadcrumbService.add('album-form-breadcrumb', 'Create', '/album/create', 2);
  }

  /**
   * Reset album component
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
      const response: Observable<IAlbum> = this._store.create({
        title: this.form.get('title')?.value,
        userId: this._store.userId
      } as IAlbum);

      response.subscribe(
        (album: IAlbum) => this._router.navigateByUrl('/album'),
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
