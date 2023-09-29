import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacter } from "../../ICharacter";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent {
  @Input() character: ICharacter | undefined;
  @Output() removeCharacter: EventEmitter<ICharacter> = new EventEmitter;

  onClickRemoveCharacter(character: ICharacter | undefined){
    this.removeCharacter.emit(character);
  }
}
