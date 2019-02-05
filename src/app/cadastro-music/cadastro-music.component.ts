import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { User } from '../models/user'
import { CadastroService } from '../service/cadastro.service';
import { MUSICA } from 'src/environments/endpoint';

@Component({
  selector: 'app-cadastro-music',
  templateUrl: './cadastro-music.component.html',
  styleUrls: ['./cadastro-music.component.css']
})
export class CadastroMusicComponent implements OnInit {

  musica: Array<any> = new Array<any>();

  formulario: FormGroup;

  novaMusic: User = new User();

  music = {
    nomeDaMusica: '',
    nomeDoCantor: '',
    novaMusic: ''
  }

  constructor(private srv: CadastroService, private fb: FormBuilder) { }

  createForm() {
    this.formulario = this.fb.group({
      nomeDoCantor: [''],
      generoDaMusica: [''],
      nomeDaMusica: ['']
    })
  }

  ngOnInit() {
    this.createForm();
    this.srv.get(MUSICA).subscribe(resposta => {
      console.log(resposta);
      this.musica = resposta;
    })

  }
  cadastro() {
    this.novaMusic = this.formulario.getRawValue();
    this.srv.post(MUSICA,this.music).subscribe(resposta => {
      console.log(resposta);
    });
    alert("Adicionado a seu diário musical!");
    this.formulario.reset();
  }

}
