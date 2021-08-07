import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      // pipe controlar o fluxo do Observable
      return control.valueChanges.pipe(
        // switchMap pega o que o usuário está digitando e converte em requisição ao backend
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificarUsuarioExistente(nomeUsuario)
        ),
        // troca a resposta de verdadeiro e falso para o objeto ou null
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        // encerrar o Observable
        first()
      );
    };
  }
}
