import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoComponent } from './acesso.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormBuilder } from '@angular/forms';

describe('AcessoComponent', () => {
  let component: AcessoComponent;
  let fixture: ComponentFixture<AcessoComponent>;
  // const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoComponent, LoginComponent, BannerComponent, CadastroComponent ],
      // providers: [ { provide: FormBuilder, useValue: formBuilder } ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
