import { Component, OnInit } from '@angular/core';

import { Character } from '../character'
import { CharacterService } from '../character.service'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

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
      characters => this.characters = characters
    )
    this.messageService.add(`CharacterComponent: Got characters array`)
  }

  add(name:string): void {
    name=name.trim()
    if (!name) {return;}

    this.characterService.addCharacter({ name } as Character)
      .subscribe( character => {
        this.characters.push(character)
      })
  }

  delete(character: Character): void {
    this.characters = this.characters.filter(c => c !== character)
    this.characterService.deleteCharacter(character.id).subscribe()
  }

  // selectedCharacter?: Character
  // onSelect(character: Character) {
  //   this.selectedCharacter = character
  //   this.messageService.add(`CharacterComponent: Selected character id=${character.id}`)
  // }

}
