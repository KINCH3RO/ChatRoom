import { Component, Input, OnInit } from '@angular/core';
import { MenuBuilderProps } from 'src/app/models/menu-builder-props';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.scss']
})
export class MenuBuilderComponent implements OnInit {

  constructor() { }

  @Input() props :MenuBuilderProps
  ngOnInit(): void {
  }

}
