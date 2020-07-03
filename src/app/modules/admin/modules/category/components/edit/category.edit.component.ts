import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../../services/forum/category.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';
import {IForumCategory} from "../../../../../../newModels/forum/IForumCategory";

@Component({
  selector: 'category-edit',
  templateUrl: './category.edit.component.html'
})

export class CategoryEditComponent implements OnInit{

  public category: IForumCategory;

  constructor(
    private titleService: Title,
    private categoryService: CategoryService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Editar categoría - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.category = data.CategoryEditGuard;
    }));
  }

  onSubmit(): void {
    this.categoryService.update(this.category).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar la categoría.");
        } else {
          this.notifierService.notify('success', "Se ha actualizado la categoría correctamente.");
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
