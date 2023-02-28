import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})

export class EntryComponent {
  @Input() title: string;
  @Input() date: string;
  @Input() category: string;
}

