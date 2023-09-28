import { Component, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/ICharacter';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-generate-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
    
  characters: ICharacter[] = [];
  
  constructor(private charactersService: CharacterService){ }

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe((characters) => {
      this.characters = characters.data;
    });
  }

  deleteCharacter(character: ICharacter){
    this.charactersService
      .deleteCharacter(character)
      .subscribe(() => 
        (
          this.characters = this.characters.filter((t) => t.id !== character.id)
        )
      );
  }
}
