import { Component, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/ICharacter';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-add-character',
  standalone: false,
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent implements OnInit {
  characters: ICharacter[] = []; 
  
  nameValue: string = "";
  hitPointsValue: number = 50;
  strengthValue: number = 50;
  defenseValue: number = 50;
  intelligenceValue: number = 50;
  classValue: string = 'knight';
  
  constructor(private characterService: CharacterService, private localStorageService: LocalStorageService) {}
  
  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      this.characters = characters.data;
    });

    this.nameValue = this.localStorageService.getValue('name', "");
    this.hitPointsValue = this.localStorageService.getValue('hitPoints');
    this.strengthValue = this.localStorageService.getValue('strength');
    this.defenseValue = this.localStorageService.getValue('defense');
    this.intelligenceValue = this.localStorageService.getValue('intelligence');
    this.classValue = this.localStorageService.getValue('characterClass');

    this.updateInputField('name', this.nameValue);
    this.updateSlider('hitPoints', this.hitPointsValue);
    this.updateSlider('strength', this.strengthValue);
    this.updateSlider('defense', this.defenseValue);
    this.updateSlider('intelligence', this.intelligenceValue);

    this.onClassChange(this.classValue);
  }

  onSliderChange(input: HTMLInputElement, key: string): void {
    const value = (parseInt(input.value, 10) - parseInt(input.min, 10)) / (parseInt(input.max, 10) - parseInt(input.min, 10));
    input.style.background = `linear-gradient(to right, var(--range_fill) 10%, var(--range_fill_pale) ${value * 100}%, var(--tertiary) ${value * 100}%, var(--tertiary) 100%)`;
    this.localStorageService.setValue(key, parseInt(input.value, 10));
  }

  onInputFieldChange(input: HTMLInputElement, key: string): void {
    this.localStorageService.setValue(key, input.value);
  }

  onClassChange(key: string): void {
    this.classValue = key;
    document.querySelectorAll("[data-characterClasses]").forEach((element) => {
      element.classList.toggle(`bg-${element.id}-selected`, element.id === key);
    });
    this.localStorageService.setValue('characterClass', key);
  }

  private updateSlider(key: string, value: number): void {
    const input = document.getElementById(key) as HTMLInputElement;
    if (input) {
      input.value = String(value);
      this.onSliderChange(input, key);
    }
  }

  private updateInputField(key: string, value: string): void {
    const input = document.getElementById(key) as HTMLInputElement;
    if (input) {
      input.value = String(value);
      this.localStorageService.setValue(key, input.value);
    }
  }

  reset(){
    this.updateSlider('hitPoints', 50); 
    this.updateSlider('strength', 50);
    this.updateSlider('defense', 50);
    this.updateSlider('intelligence', 50);
    this.updateInputField('name', "");
    
    this.onClassChange('knight');
  }

  save(){
    if(this.nameValue === ""){ alert('Please add a name!'); return; }

    const newCharacter = {
      id: this.characters[this.characters.length-1] ? this.characters[this.characters.length-1].id + 1 : 0,
      name: this.nameValue,
      hitPoints: this.hitPointsValue,
      strength: this.strengthValue,
      defense: this.defenseValue,
      intelligence: this.intelligenceValue,
      class: this.classValue
    };

    this.characterService.addCharacter(newCharacter).subscribe((character) => (this.characters.push(character)));
    this.reset();
  }
}
