export interface Paragraph {
  value: string;
};

export enum KeyboardKeys {
  Space = 'Space',
  Enter = 'Enter',
  Backspace = 'Backspace'
};

export interface Post {
  title: string;
  subtitle?: string;
  paragraphs: Paragraph[];
};
