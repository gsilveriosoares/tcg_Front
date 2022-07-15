
/**
 * @help https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
 * @help https://www.learnrxjs.io/learn-rxjs/operators/creation/timer
 */

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from './../service/http.service';
import { DataExchangeService } from './../service/data-exchange.service';
import { ICard } from './../interface/tcg';
import * as TCG from './../test/tcg.json';
import { timer } from 'rxjs';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit, AfterViewInit {

  pokemonForm: FormGroup;
  submitted = false;
  readonly BASE_URL = 'https://api.pokemontcg.io/v1/cards?name=';

  public requestUrl: string;
  public resultApiRequest: string;
  public responseErr: string;

  public audioElement;

  public pikaRunAnimDuration = '0.4s';
  public bAnimationPikaRun = true;

  private _rxTimerJump = timer(1400);
  private _rxTimerSpeedRun = timer(4000);


  
  get pFC() { return this.pokemonForm.controls; }


  constructor(private formBuilder: FormBuilder, private httpSrvc: HttpService, private data: DataExchangeService) {
    this.responseErr = '';
   }

  ngOnInit() {
    this.pokemonForm = this.formBuilder.group({
      pokemon_name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\s\-]+$')]],
      imgResolutionOption: ['lowResolutionImages']
    });
  }

  ngAfterViewInit(): void {
    this.resultApiRequest = this.BASE_URL;
  }

  onPokemonNameChange() {
    this.requestUrl = `${this.BASE_URL}${this.pFC.pokemon_name.value}`;
  }


  onSubmit() {

    this.submitted = true;

    console.log('onSubmit');

    console.log('pokemon_name.errors: ' + JSON.stringify(this.pFC.pokemon_name.errors));
    console.log('pokemon_name.invalid: ' + JSON.stringify(this.pFC.pokemon_name.invalid));
    console.log('pokemon_name.value: ' + JSON.stringify(this.pFC.pokemon_name.value));

  
    if (this.pokemonForm.invalid === false) {

    
      console.log('try fetch... ');

 
      this.data.changePokemonName(this.pFC.pokemon_name.value);

      this.httpSrvc.fetchPokemonName(this.requestUrl).subscribe(
        (res) => {
          console.log('fetchPokemonName result: ' + JSON.stringify(res.cards));
          this.responseErr = '';

          this.resultApiRequest = JSON.stringify(res);
          this.data.changeImageResolutionOption(this.pFC.imgResolutionOption.value);
          this.data.changeHttpResponse(res.cards);

        },
        (err) => {
          const cards = <ICard[]>[];
          this.data.changeHttpResponse(cards);

          console.log('err.message' + err.message);
          this.responseErr = err.message;

        
        }
      );
    }
  }


}
