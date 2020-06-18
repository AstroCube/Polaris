import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../../models/forum/category';
import {CategoryService} from '../../../../../../services/category.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';

@Component({
  selector: 'category-create',
  templateUrl: './category.create.component.html'
})

export class CategoryCreateComponent implements OnInit {

  public category: Category;

  constructor(
    private _titleService: Title,
    private _categoryService: CategoryService,
    private _notifierService: NotifierService,
    private _router: Router
  ) {
    this.category = new Category("","",0);
  }

  ngOnInit(): void {
    this._titleService.setTitle("Crear categoría - " + GLOBAL.title);
  }

  onSubmit(): void {
    this._categoryService.category_create(this.category).subscribe(
      response => {
        if(!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al crear la categoría.");
        } else {
          this._notifierService.notify('success', "Se ha creado la categoría correctamente.");
          this._router.navigate(["/admin/categorias"]);
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }
}
