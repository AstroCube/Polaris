import {Component, OnInit} from '@angular/core';
import {faIndent, faPencilAlt, faPlus, faSort} from '@fortawesome/free-solid-svg-icons';
import {Forum} from '../../../models/forum/forum';
import {ForumService} from '../../../services/forum.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'forum-edit',
  templateUrl: './forum.edit.component.html'
})

export class ForumEditComponent implements OnInit{

  public forum: Forum;
  public forum_tree: any[];
  public only_categories: boolean;
  faPencilAlt = faPencilAlt;
  faPlus = faPlus;
  faSort = faSort;
  faIndent = faIndent;

  constructor(
    private _titleService: Title,
    private _forumService: ForumService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._titleService.setTitle("Editar foro - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.forum = data.ForumEditGuard.forum_info.forum;
      this.only_categories = data.ForumEditGuard.forum_tree.only_categories;
      this.forum_tree = data.ForumEditGuard.forum_tree.forum_tree;
    }));
    this.forum.parent = "";
    this.forum.category = "";
  }

  getId(object: any) {
    if (this.only_categories) {
      this.forum.parent = null;
    } else {
      if (object.category_id) {
        this.forum.parent = object._id;
        this.forum.category = object.category_id;
      } else {
        let complete_node = this.forum_tree.filter(filter => {
          return filter.category === object.category;
        })[0];
        this.forum.parent = null;
        this.forum.category = complete_node.category_id;
      }
    }
  }

  onSubmit() {
    if (this.forum.parent === null) this.forum.parent = undefined;
    this.getId(this.forum.parent);
    this._forumService.forum_update(this.forum._id.toString(), this.forum).subscribe(
      response => {
        if(!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el foro.");
        } else {
          this._notifierService.notify('success', "Se ha actualizado el foro correctamente.");
          this._router.navigate(["/admin/foros"]);
        }
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

}
