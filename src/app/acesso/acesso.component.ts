import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations:[
    trigger('animacaoBanner',[
      state('criado',style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          opacity: 0,
          transform: 'translate(-30px, 0px)'
        }),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('animacaoPainel',[
      state('criado',style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          opacity: 0,
          transform: 'translate(30px, 0px)'
        }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
