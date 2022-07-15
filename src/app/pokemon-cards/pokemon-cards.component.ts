import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from './../service/data-exchange.service';
import { ICard } from '../interface/tcg';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonCardsComponent implements OnInit {

  public receivedCards = <ICard[]>[];
  public pokemonName: string;
  public imgResloution: string;
  public selectedCards = <number[]>[];
  public counterVal = 0;
  readonly BASE_URL = 'https://api.pokemontcg.io/v1/cards?id=';

  constructor(private data: DataExchangeService, private httpSrvc: HttpService, private router: Router) { }

  ngOnInit() {
    this.data.currentResponse.subscribe(res => this.receivedCards = res);
    this.data.currentPokemonName.subscribe(name => this.pokemonName = name);
    this.data.currentImageResolutionOption.subscribe(imgRes => this.imgResloution = imgRes);
  }

  public tcgCardClicked(ndx: number) {

    if (this.selectedCards.includes(ndx) === false) {

      this.selectedCards.push(ndx);
    } else {

      const i = this.selectedCards.indexOf(ndx, 0);
      this.selectedCards.splice(i, 1);
    }

    this.data.changeSelectedCards(this.selectedCards);
  }

  public onReload(id){
    this.router.navigate(["pokemonDetail/",id])
  }

  public tcgCardDblClicked(ndx: number) {
    console.log('DBL: ' + ndx);


    let url: string;
    let urlSplt = <string[]>[];


    if (this.imgResloution === 'hiResolutionImages') {
      url = this.receivedCards[ndx].imageUrlHiRes;
    } else {
      url = this.receivedCards[ndx].imageUrl;
    }

    this.httpSrvc.fetchImage(url);

  }

  public onChangeSelectAll(state: boolean) {

    this.selectedCards.length = 0;

    if (state === true) {

      for (let i = 0; i < this.receivedCards.length; i++) {
        this.selectedCards.push(i);
      }
    } else {

    }
    this.data.changeSelectedCards(this.selectedCards);
  }
}
