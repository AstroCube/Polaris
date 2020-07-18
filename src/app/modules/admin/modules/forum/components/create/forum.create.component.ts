import {Component, OnInit} from '@angular/core';
import {IForum, IForumCreationTree} from "../../../../../../newModels/forum/IForum";
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../../../../../services/forum/forum.service";
import {NotifierService} from "angular-notifier";
import {ActivatedRoute, Router} from "@angular/router";
import {GLOBAL} from "../../../../../../services/global";
import {ICategoryTree} from "../../../../../../newModels/forum/IForumCategory";

@Component({
  selector: 'forum-create',
  templateUrl: './forum.create.component.html'
})
export class ForumCreateComponent implements OnInit {

  public tree: IForumCreationTree[];
  public forum: IForum;

  constructor(
    private titleService: Title,
    private forumService: ForumService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.forum = {} as IForum;
    this.tree = [];
  }

  ngOnInit() {
    this.titleService.setTitle("Crear foro - " + GLOBAL.title);
    this.route.data.subscribe((data => {
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
    this.forum.parent = (this.forum.parent as IForumCreationTree).forumId || undefined;

    this.forumService.create(this.forum).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al crear el foro.");
        } else {
          this.notifierService.notify('success', "Se ha creado el foro correctamente.");
          this.router.navigate(["/admin/foros"]);
        }
      },

      error => {
        this.notifierService.notify('error', error.message);
        console.log(error);
      }
    );
  }

  selectGroup(key: string | object, children: any[]): any {
    return children[0];
  }

}
