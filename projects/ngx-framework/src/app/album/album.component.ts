import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlbumStore } from './album.store';
import { IAlbum } from '@framework-lib/ngx-domain';
import { NgxBreadcrumbService } from '@framework-lib/ngx-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumComponent implements OnInit {

  public contentLoaded = false;
  public searchPeople = false;
  public cpfInputMask = '000.000.000-00';
  public cpfPlaceholder = '___.___.___-__';
  public form!: FormGroup;
  public pessoa$: Observable<IAlbum> = this._store.pessoa$;

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
    private _breadcrumbService: NgxBreadcrumbService
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.contentLoaded = true; }, 1500);

    this.form = this._formBuilder.group({
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.pattern('^\d{3}\.\d{3}\.\d{3}-\d{2}$')
      ])
    });

    this._breadcrumbService.add('query-breadcrumb', 'Consulta', '/query', 1);
  }

  /**
   * Reset query component
   */
  reset(): void {
    this.form.reset();
    this._store.reset();
  }

  /**
   * Submit
   */
  submit(): void {
    const cpf: string = this.form.get('cpf')?.value;
  }

  /**
   * Método responsável por verificar se o CPF existe na base de dados
   */
  private checkResultSearch(): void {
    let error = false;
    this._store.notify$.subscribe(() => {
      Swal.fire(
        'CPF Não identificado!',
        `O CPF informado não foi identificado na base de dados.`,
        'warning'
      );
      this.searchPeople = false;
      error = true;
    });

    this.pessoa$.subscribe(() => {
      if (!error) {
        this.searchPeople = true;
      }
    });
  }

}
