import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICard } from '../interface/tcg';
import { DataExchangeService } from '../service/data-exchange.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  receivedCards: ICard[];

  constructor(private data: DataExchangeService, private httpSrvc: HttpService, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.httpSrvc.pokemonById(this.route.snapshot.params['id']).subscribe(
      ICard =>{
        this.receivedCards = ICard['cards'];
      }
    )
   
  }

}
