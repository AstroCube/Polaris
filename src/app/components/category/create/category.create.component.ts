import {Component} from '@angular/core';
import {faPencilAlt, faPlus, faSort} from '@fortawesome/free-solid-svg-icons';
import {Category} from '../../../models/forum/category';
import {CategoryService} from '../../../services/category.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'category-create',
  templateUrl: './category.create.component.html'
})

export class CategoryCreateComponent {

  public category: Category;
  faPencilAlt = faPencilAlt;
  faPlus = faPlus;
  faSort = faSort;

  constructor(
    private _categoryService: CategoryService,
    private _notifierService: NotifierService,
    private _router: Router
  ) {
    this.category = new Category("","",0);
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
