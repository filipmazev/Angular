import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideModalConfig } from '../generic-side-modal.component';

@Component({
  selector: 'app-generic-side-modal-container',
  templateUrl: './generic-side-modal-container.component.html',
  styleUrls: ['./generic-side-modal-container.component.css']
})
export class GenericSideModalContainerComponent {
  @Input() modal_state_function?: (isOpen: boolean) => void;
  @Input() mobile_backgdrop?: boolean = false;
  @Input() close_delay?: number;
  @Input() defaultStyle?: boolean = true;
  @Input() overrideFullHeight?: boolean = false;
  @Input() handle_extreme_overflow?: boolean = false;
  @Input() sideModalConfig?: SideModalConfig = { side: 'right' };
  @Input() handle_mobile?: boolean = true;
  @Input() sideNavTitleText?: string = undefined;

  @Output() handleCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  modalOpen: boolean = true;

  constructor() { }

  closeModal(state?: boolean) {
    this.modalOpen = state ? state : !this.modalOpen;
    if (this.modal_state_function) { this.modalClosed.emit(); }
  }

}
