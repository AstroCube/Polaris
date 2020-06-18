import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../../models/forum/category';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../../../../services/category.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'category-list',
  templateUrl: './category.list.component.html'
})

export class CategoryListComponent implements OnInit {

  public categories: Category[];
  public empty_record: boolean;

  constructor(
    private _titleService: Title,
    private _categoryService: CategoryService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute
  ) {
    this.empty_record = false;
  }


  ngOnInit(): void {
    this._titleService.setTitle("Categorías - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.categories = data.CategoryListGuard.categories;
      this.empty_record = data.CategoryListGuard.empty_record;
    }));
  }

  deleteCategory(category: string): void {
    this._categoryService.category_delete(category).subscribe(
      response => {
        if (!response.deleted) {
          this._notifierService.notify('error', "Ha ocurrido un error al eliminar la categoria.");
        } else {
          if (response.fallback) {
            this._notifierService.notify('warning', "Se ha creado una categoría de respaldo, recarga la página para verla.");
          } else {
            this._notifierService.notify('success', "Se ha eliminado la categoría correctamente.");
          }
          this.categories = this.categories.filter((cat) => { return cat._id !== category; });
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
