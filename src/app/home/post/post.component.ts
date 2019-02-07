import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  });


  constructor() { }

  ngOnInit() {
  }

  public publicar(): void {
    console.log('envio do post');
  }
}
