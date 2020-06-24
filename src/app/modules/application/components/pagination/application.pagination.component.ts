import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Router} from '@angular/router';

@Component({
  selector: "pagination",
  templateUrl: "./application.pagination.component.html"
})

export class ApplicationPaginationComponent implements OnInit {

  @Input() actual_page;
  @Input() route;
  @Input() queryParams;
  @Input() last_page;
  @Input() centered;
  @Input() pageAsQuery = false;
  @Input() eventOriented = false;
  @Output() onNavigate: EventEmitter<number>;
  public paginator_type;
  public first_page;
  public pages: number[];

  constructor(
    private _router: Router
  ) {
    this.onNavigate = new EventEmitter<number>();
  }

  ngOnInit() {
    this.paginator(this.last_page, this.actual_page);
  }

  paginator(totalPages: number, currentPage: number = 1) {
    this.last_page = totalPages;
    this.actual_page = currentPage;
    this.first_page = 1;
    if (totalPages <= 7) {
      this.paginator_type = "less_five";
      this.pages = Array.from({length: totalPages}, (v, k) => k+1);
    } else {
      if (currentPage <= 5) {
        this.paginator_type = "first_five";
        this.pages = Array.from({length: 7}, (v, k) => k+1);
      } else if (currentPage + 5 >= totalPages) {
        this.paginator_type = "last_five";
        let pagination = [];
        for (let i = totalPages-6; i <= totalPages; i++) {
          pagination.push(i);
        }
        this.pages = pagination;
      } else {
        this.paginator_type = "middle_paginator";
        let pagination = [];
        for (let i = currentPage-2; i <= currentPage+2; i++) {
          pagination.push(i);
        }
        this.pages = pagination;
      }
    }
  }

  navigate(page: number) {
    if (this.eventOriented) {
      this.onNavigate.emit(page);
    } else {
      let params = {};
      if (this.queryParams) params = this.queryParams;
      if (this.pageAsQuery) params["page"] = page;
      if (!this.pageAsQuery) {
        this._router.navigate([this.route + page], {queryParams: params});
      } else {
        this._router.navigate([this.route], {queryParams: params});
      }
    }
  }


}
