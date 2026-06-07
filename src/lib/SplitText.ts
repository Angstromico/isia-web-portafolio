'use client';

export class SplitText {
  elements: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  chars: HTMLElement[] = [];

  constructor(
    selector: string | HTMLElement | HTMLElement[],
    options: { type: string; mask?: string }
  ) {
    if (typeof window === 'undefined') return;

    // Resolve selector
    let els: HTMLElement[] = [];
    if (typeof selector === 'string') {
      els = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof HTMLElement) {
      els = [selector];
    } else if (Array.isArray(selector)) {
      els = selector;
    }
    this.elements = els;

    const mask = options.mask || '';

    this.elements.forEach((el) => {
      // Get plain text
      const text = el.textContent || '';
      el.innerHTML = ''; // clear original HTML

      // Split text by space into words
      const wordsArray = text.split(/\s+/).filter(Boolean);

      wordsArray.forEach((wordText, idx) => {
        // Add a space text node before the word if it is not the first word
        if (idx > 0) {
          el.appendChild(document.createTextNode(' '));
        }

        // Create word element
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word inline-block';
        wordSpan.textContent = wordText;

        if (mask === 'words') {
          // Wrap word in a mask span to prevent overflow visible
          const maskSpan = document.createElement('span');
          maskSpan.className = 'inline-block overflow-hidden vertical-align-bottom';
          maskSpan.appendChild(wordSpan);
          el.appendChild(maskSpan);
        } else {
          el.appendChild(wordSpan);
        }

        this.words.push(wordSpan);
      });
    });
  }

  static create(
    selector: string | HTMLElement | HTMLElement[],
    options: { type: string; mask?: string }
  ) {
    return new SplitText(selector, options);
  }
}
