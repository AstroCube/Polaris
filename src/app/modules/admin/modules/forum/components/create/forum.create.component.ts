import {Component, OnInit} from '@angular/core';
import {Forum} from '../../../../../../models/forum/forum';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../../../../../../services/forum.service';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';

@Component({
  selector: 'forum-create',
  templateUrl: './forum.create.component.html'
})

export class ForumCreateComponent implements OnInit {

  public forum: Forum;
  public forum_tree: any[];
  public only_categories: boolean;

  constructor(
    private _titleService: Title,
    private _forumService: ForumService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.forum = new Forum("","",0,"","","");
  }

  ngOnInit() {
    this._titleService.setTitle("Crear foro - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.only_categories = data.ForumCreateGuard.only_categories;
      this.forum_tree = data.ForumCreateGuard.forum_tree;
    }));
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
    this.getId(this.forum.parent);
    this._forumService.forum_create(this.forum).subscribe(
      response => {
        if(!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al crear el foro.");
        } else {
          this._notifierService.notify('success', "Se ha creado el foro correctamente.");
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
