import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyboardKeys } from 'apps/write-app/src/constants/write.interface';

@Component({
  selector: 'write-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent {
  @Input() text!: string;
  @Input() idx!: number;
  @Output() textChange = new EventEmitter<string>();
  @Output() removeParagraph = new EventEmitter<void>();
  @Output() addParagraph = new EventEmitter<void>();


  onKeyUp(event: KeyboardEvent): void {
    const elem: HTMLElement = event.target as HTMLElement;
    this.textChange.emit(elem?.innerText);

    if (!elem.innerText && event.code === KeyboardKeys.Backspace) {
      this.removeParagraph.emit();
    }

    if (event.code === KeyboardKeys.Enter) {
      event.preventDefault();
      this.addParagraph.emit();
    }

    event.stopPropagation();
  }

  onKeyDown(event: KeyboardEvent): void {
    const elem: HTMLElement = event.target as HTMLElement;
    if (elem.innerText && event.code === KeyboardKeys.Enter) {
      event.preventDefault();
    }
    event.stopPropagation();
  }
}
