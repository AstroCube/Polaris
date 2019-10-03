import {Component, Input, OnInit} from "@angular/core";
import {faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "pagination",
  templateUrl: "./application.pagination.component.html"
})

export class ApplicationPaginationComponent implements OnInit {

  @Input() actual_page;
  @Input() route;
  @Input() last_page;
  @Input() centered;
  public paginator_type;
  public first_page;
  public pages: number[];
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;


  ngOnInit() {
    this.paginator(this.last_page, this.actual_page);
  }

  paginator(totalPages: number, currentPage: number = 1) {
    console.log(this.route);
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
}
