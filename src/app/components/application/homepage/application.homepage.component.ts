import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/forum/post';

@Component({
  selector: 'application-homepage',
  templateUrl: './application.homepage.component.html'
})

export class ApplicationHomepageComponent implements OnInit {

  public posts : Post[];
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private _route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._route.data.subscribe((data) => {
      this.posts = data.ApplicationHomepageGuard;
      console.log(this.posts);
    });
  }
}
