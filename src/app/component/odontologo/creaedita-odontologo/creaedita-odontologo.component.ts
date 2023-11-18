import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Odontologo } from 'src/app/model/odontologo';

@Component({
  selector: 'app-creaedita-odontologo',
  templateUrl: './creaedita-odontologo.component.html',
  styleUrls: ['./creaedita-odontologo.component.css']
})
export class CreaeditaOdontologoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  odontologo: Odontologo=new Odontologo();
  mensaje: string = '';
  
  ngOnInit(): void {
  
}
}
