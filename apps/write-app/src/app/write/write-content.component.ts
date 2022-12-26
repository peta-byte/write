import { Component } from '@angular/core';
import { KeyboardKeys, Paragraph } from '../../constants/write.interface';

@Component({
  selector: 'write-content',
  templateUrl: './write-content.component.html',
  styleUrls: ['./write-content.component.scss'],
})
export class WriteContentComponent {
  paragraphs: Paragraph[] = [{ value: '' }];
  title!: string;
  subtitle!: string;

  onTitleKeyUp(event: KeyboardEvent): void {
    const elem: HTMLElement = event.target as HTMLElement;

    if (event.code === KeyboardKeys.Enter) {
      event.preventDefault();
      const elem: HTMLElement = document.getElementById(`subtitle`) as HTMLElement;
      if (elem) {
        elem.focus();
      }
    } else {
      this.title = elem.innerText;
    }

    event.stopPropagation();
  }

  onSubTitleKeyUp(event: KeyboardEvent): void {
    const elem: HTMLHeadingElement = event.target as HTMLHeadingElement;
    this.subtitle = elem.innerText;

    if (!elem.innerText && event.code === KeyboardKeys.Backspace) {
      const title: HTMLHeadingElement = document.getElementById(`title`) as HTMLHeadingElement;
      if (title) {
        if (title.childNodes?.length) {
          this.moveCaretToEnd(title);
        }
        title.focus();
      }
    }

    if (event.code === KeyboardKeys.Enter) {
      event.preventDefault();
      const elem: HTMLElement = document.getElementById(`paragraph-0`) as HTMLElement;
      if (elem) {
        elem.focus();
      }
    }

    event.stopPropagation();
  }

  onKeyDown(event: KeyboardEvent): void {
    const elem: HTMLElement = event.target as HTMLElement;

    if (event.code === KeyboardKeys.Enter) {
      event.preventDefault();
    }

    event.stopPropagation();
  }

  removeParagraph(id: number): void {
    if (id !== 0) {
      this.paragraphs = this.paragraphs.filter((p, idx) => idx !== id);
      const elem: HTMLParagraphElement = document.getElementById(`paragraph-${id-1}`) as HTMLParagraphElement;
      if (elem?.childNodes?.length) {
        this.moveCaretToEnd(elem);
        elem.focus();
      }
    }
  }

  addParagraph(id: number): void {
    this.paragraphs.splice(id + 1, 0, { value: '' });
    setTimeout(() => {
      const elem: HTMLElement = document.getElementById(`paragraph-${id + 1}`) as HTMLElement;
      if (elem) {
        elem.focus();
      }
    }, 1000);
  }

  private moveCaretToEnd(elem: HTMLElement): void {
    const range = document.createRange();
    const selection = window.getSelection() as Selection;

    const lastTextNode = elem.childNodes[elem.childNodes.length - 1];
    const textNodeLength = elem.childNodes[elem.childNodes.length - 1]?.nodeValue?.length;

    range.setStart(lastTextNode, textNodeLength ?? 0);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }
}
