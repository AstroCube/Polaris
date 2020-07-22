import {Component, OnInit} from '@angular/core';
import {ForumService} from '../../../../../../services/forum/forum.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';
import {ICategoryTree} from "../../../../../../newModels/forum/IForumCategory";
import {IForum, IForumCreationTree} from "../../../../../../newModels/forum/IForum";

@Component({
  selector: 'forum-edit',
  templateUrl: './forum.edit.component.html'
})

export class ForumEditComponent implements OnInit {

  public forum: IForum;
  public category: ICategoryTree[];
  public tree: IForumCreationTree[];

  constructor(
    private titleService: Title,
    private forumService: ForumService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tree = [];
  }

  ngOnInit() {
    this.titleService.setTitle("Editar foro - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.forum = data.ForumEditGuard;
      const categories: ICategoryTree[] = data.ForumListGuard;
      categories.forEach(category => {
        this.tree.push({category: category.category.name, categoryId: category.category._id, forum: 'Categoría Root', forumId: null});
        category.tree.forEach(forum => this.tree.push({
          forumId: forum._id,
          forum: forum.name,
          category: category.category.name,
          categoryId: category.category._id
        }));
      });
    }));
  }


  onSubmit() {
    this.forum.category = (this.forum.parent as IForumCreationTree).categoryId;
    if ((this.forum.parent as IForumCreationTree).forumId) {
      this.forum.parent = (this.forum.parent as IForumCreationTree).forumId;
    } else {
      this.forum.parent = undefined;
    }

    this.forumService.update(this.forum).subscribe(
      response => {
        if(!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el foro.");
        } else {
          this.notifierService.notify('success', "Se ha actualizado el foro correctamente.");
          this.router.navigate(["/admin/foros"]);
        }
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this.notifierService.notify('error', error.message);
        }
      }
    );
  }

  selectGroup(key: string | object, children: any[]): any {
    return children[0];
  }

}
