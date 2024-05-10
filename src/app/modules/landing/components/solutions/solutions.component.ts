import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'landing-solutions',
  templateUrl: './solutions.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingSolutionsComponent implements OnInit {
  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-1', 'translate-x-0');
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(document.querySelector('#about'));
    window.addEventListener('scroll', () => {
      const element = document.getElementById('tech');
      const position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('opacity-100');
      } else {
        element.classList.remove('opacity-100');
      }
    });
  }
  scrollToAbout() {
    const aboutDiv = document.getElementById('about');
    if (aboutDiv) {
      const divRect = aboutDiv.getBoundingClientRect();
      const yOffset = divRect.top * 2 + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
