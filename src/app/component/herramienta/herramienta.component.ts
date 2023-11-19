import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.css']
})
export class HerramientaComponent {
  constructor(public route:ActivatedRoute) {}
}
