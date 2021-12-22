import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlbumStore } from '../album.store';
import { IAlbum } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable, ReplaySubject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { FormType } from '@framework-lib/ngx-domain';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-album',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateComponent implements OnInit {

  public id: number = 0;
  public album!: IAlbum;

  public loading = false;
  public form!: FormGroup;
  public albums$: Observable<IAlbum[]> = this._store.albums$;
  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * CONSTRUCTOR
   * @param _formBuilder: FormBuilder
   * @param _store: AlbumStore
   * @param _breadcrumbService: NgxBreadcrumbService
   * @param _router: Router
   * @param _route: ActivatedRoute
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _store: AlbumStore,
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
    });

    this.prepare();
    this._breadcrumbService.add('album-breadcrumb', 'Album', '/album', 1);
    this._breadcrumbService.add('album-form-breadcrumb', 'Update', '/album/update', 2);
  }

  private prepare(): void {
    if (this.id != 0) {
      this.albums$?.pipe(
        takeUntil(this.destroy$),
        filter((album: IAlbum[]) => album !== undefined)
      ).subscribe((album: IAlbum[]) => {
        this.album = album[0];
        this.loading = true;
      });

      this.form.get('title')?.setValue(this.album?.title);
    } else {
      Swal.fire({
        title: 'Página Indisponível!',
        text: 'Ocorreu um erro ao acessar página!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigateByUrl('/album');
        }
      })
    }
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
      const response: Observable<IAlbum> = this._store.update({
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
