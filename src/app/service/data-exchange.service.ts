import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICard } from './../interface/tcg';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private _res = <ICard[]>[];
  pokName!: string;
  imgRes!: string;
  private _selectedCards = <number[]>[];



  private httpResponse = new BehaviorSubject(this._res);
  currentResponse = this.httpResponse.asObservable();


  private pokemonName = new BehaviorSubject(this.pokName);
  currentPokemonName = this.pokemonName.asObservable();


  private imageResolutionOption = new BehaviorSubject(this.imgRes);
  currentImageResolutionOption = this.imageResolutionOption.asObservable();

 
  private selectedCards = new BehaviorSubject(this._selectedCards);
  currentSelectedCards = this.selectedCards.asObservable();

  constructor() { }

  changeHttpResponse(res: ICard[]) {
    this.httpResponse.next(res);
  }

  changePokemonName(pokName: string) {
    this.pokemonName.next(pokName);
  }

  changeImageResolutionOption(imgRes: string) {
    this.imageResolutionOption.next(imgRes);
  }

  changeSelectedCards(selCards: number[]) {
    this.selectedCards.next(selCards);
  }
}
