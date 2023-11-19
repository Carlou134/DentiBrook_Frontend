import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reputacion',
  templateUrl: './reputacion.component.html',
  styleUrls: ['./reputacion.component.css']
})
export class ReputacionComponent {
  constructor(public route:ActivatedRoute) {}
}
