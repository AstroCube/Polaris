import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faSort} from '@fortawesome/free-solid-svg-icons';
import {Category} from '../../../models/forum/category';
import {CategoryService} from '../../../services/category.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'category-edit',
  templateUrl: './category.edit.component.html'
})

export class CategoryEditComponent implements OnInit{

  public category: Category;
  faPencilAlt = faPencilAlt;
  faSort = faSort;

  constructor(
    private _categoryService: CategoryService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      console.log(data.CategoryEditGuard);
      this.category = data.CategoryEditGuard.category;
    }));
  }

  onSubmit(): void {
    this._categoryService.category_update(this.category._id, this.category).subscribe(
      response => {
        if(!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar la categoría.");
        } else {
          this._notifierService.notify('success', "Se ha actualizado la categoría correctamente.");
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
