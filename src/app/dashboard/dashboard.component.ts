import { Component, OnInit } from '@angular/core';

import { Character } from '../character'
import { CharacterService } from '../character.service'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  characters: Character[] = []

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.getCharacters()
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe(
      characters => this.characters = characters.slice(1,5)
    )
    this.messageService.add(`CharacterComponent: Got top characters array`)
  }

  selectedCharacter?: Character
  onSelect(character: Character) {
    this.selectedCharacter = character
    this.messageService.add(`CharacterComponent: Selected character id=${character.id}`)
  }

}
