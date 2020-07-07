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
      this.category = data.ForumListGuard;
      this.category.forEach(category => {
        if (category.tree.length > 0) {
          category.tree.forEach(forum => {
            const selector: IForumCreationTree = {
              forumId: forum._id,
              forum: forum.name,
              category: category.category.name,
              categoryId: category.category._id
            };
            this.tree.push(selector);
            //@ts-ignore
            if (this.forum.parent && selector.forumId === (this.forum.parent as IForum)._id) this.forum.parent = selector;
          });
        } else {
          this.tree.push({category: category.category.name, categoryId: category.category._id} as IForumCreationTree);
        }
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
