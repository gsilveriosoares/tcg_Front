/**
 *
 * @description https://docs.pokemontcg.io/
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICard } from '../interface/tcg';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  readonly BASE_URL = 'https://api.pokemontcg.io/v1/cards?id=';

  constructor(private http: HttpClient) { }

  public fetchPokemonName(url: string): any {

    return this.http.get(url);

  }


  public fetchImage(url: string) {
    this.http.get(url, { responseType: 'arraybuffer',   headers: new HttpHeaders({
      'Access-Control-Allow-Origin': ' https://encrypted-tbn0.gstatic.com/'
    }) })
      .subscribe((res) => {
        const blob = new Blob([res], { type: 'image/png' });
        const urlBlob = window.URL.createObjectURL(blob);
        const pwa = window.open(urlBlob);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
          alert('Desative seu bloqueador de pop-ups e tente novamente.');
        }
      }
      );
  }

  pokemonById(id:string): Observable<ICard[]>{
    return this.http.get<ICard[]>(`${this.BASE_URL}${id}`)
  }

}
