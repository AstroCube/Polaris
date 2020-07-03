import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../../../../services/forum/category.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IForumCategory} from "../../../../../../newModels/forum/IForumCategory";
import {IPaginateResult} from "../../../../../../newModels/IModel";

@Component({
  selector: 'category-list',
  templateUrl: './category.list.component.html'
})

export class CategoryListComponent implements OnInit {

  public categories: IPaginateResult<IForumCategory>;

  constructor(
    private titleService: Title,
    private categoryService: CategoryService,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.titleService.setTitle("Categorías - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.categories = data.CategoryListGuard;
    }));
  }

  deleteCategory(category: string): void {
    this.categoryService.delete(category).subscribe(
      response => {
        if (!response.deleted) {
          this.notifierService.notify('error', "Ha ocurrido un error al eliminar la categoria.");
        } else {
          if (response.fallback) {
            this.notifierService.notify('warning', "Se ha creado una categoría de respaldo, recarga la página para verla.");
          } else {
            this.notifierService.notify('success', "Se ha eliminado la categoría correctamente.");
          }
          this.categories.data.filter((cat) => { return cat._id !== category; });
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }
}
