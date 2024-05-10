import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'landing-about',
  templateUrl: './about.component.html',
  styles: [
    `
      @keyframes fall {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(100%);
        }
      }

      .binary-digit {
        animation: fall linear infinite;
        animation-duration: calc(1s * var(--speed));
        font-size: var(--size);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LandingAboutComponent implements OnInit {
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const element = document.getElementById('about');
      const position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('opacity-100');
      } else {
        element.classList.remove('opacity-100');
      }
    });
  }
}
