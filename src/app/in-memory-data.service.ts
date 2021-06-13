import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './character'

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {

  constructor() { }

  createDb() {
    const characters = [
      {id: 10101, name:'WoL'},
      {id: 10201, name:'Firion'},
      {id: 10301, name:'OK'},
      {id: 10401, name:'Cecil'},
      {id: 10501, name:'Bartz'},
      {id: 10601, name:'Terra'},
      {id: 10701, name:'Cloud'},
      {id: 10801, name:'Squall'},
      {id: 10901, name:'Zidane'},
      {id: 11001, name:'Tidus'},
    ]
    return {characters}
  }

  genId(characters: Character[]): number {
    return characters.length > 0 ? Math.max(...characters.map(character => character.id))+1 : 20000
  }
}
