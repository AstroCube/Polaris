import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../../models/forum/category';
import {CategoryService} from '../../../../../../services/forum/category.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';
import {IForumCategory} from "../../../../../../newModels/forum/IForumCategory";

@Component({
  selector: 'category-create',
  templateUrl: './category.create.component.html'
})

export class CategoryCreateComponent implements OnInit {

  public category: IForumCategory;

  constructor(
    private titleService: Title,
    private categoryService: CategoryService,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.category = {} as IForumCategory;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Crear categoría - " + GLOBAL.title);
  }

  onSubmit(): void {
    this.categoryService.create(this.category).subscribe(
      response => {
        if(!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al crear la categoría.");
        } else {
          this.notifierService.notify('success', "Se ha creado la categoría correctamente.");
          this.router.navigate(["/admin/categorias"]);
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
