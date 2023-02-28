import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  constructor(private route: ActivatedRoute) {};
  title = this.route.snapshot.queryParamMap.get('title');
  category = this.route.snapshot.queryParamMap.get('category');
  date = this.route.snapshot.queryParamMap.get('date');
  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap.get('category'))
    console.log(this.category)
    window.scrollTo(0, 0);
  }
}
