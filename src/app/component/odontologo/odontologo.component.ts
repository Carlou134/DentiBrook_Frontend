import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})
export class OdontologoComponent {
  constructor(public route:ActivatedRoute) {}
}
