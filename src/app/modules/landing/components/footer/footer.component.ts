import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'landing-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToAbout(element: string) {
    const aboutDiv = document.getElementById(element);
    if (aboutDiv) {
      const divRect = aboutDiv.getBoundingClientRect();
      const yOffset = divRect.top * 2 + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
