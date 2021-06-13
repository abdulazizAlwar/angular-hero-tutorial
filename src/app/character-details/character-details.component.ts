import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Character } from '../character';
import { CharacterService } from '../character.service'
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  @Input() character?: Character

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location,
  ) { }

  getCharacter(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
      )
    this.characterService.getCharacter(id).subscribe(
      character => this.character = character
    )
  }

  ngOnInit(): void {
    this.getCharacter()
  }

  goBack(): void {
    this.location.back()
  }

}
