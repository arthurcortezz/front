import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'landing-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      .coffee-cup {
        position: relative;
        width: 200px;
      }

      .cup {
        width: 100%;
      }

      .smoke {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        animation: rise 2s ease-in-out infinite;
      }

      @keyframes rise {
        0% {
          transform: translateX(-50%) translateY(0);
        }
        50% {
          transform: translateX(-50%) translateY(-2%);
        }
        100% {
          transform: translateX(-50%) translateY(0);
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LandingHeroComponent implements OnInit {
  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(document.querySelector('#meuElemento'));
  }
  scrollToNext() {
    const aboutDiv = document.getElementById('about');
    if (aboutDiv) {
      const divRect = aboutDiv.getBoundingClientRect();
      const yOffset = divRect.top + window.scrollY - 15;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
