import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'landing-projects',
  templateUrl: './projects.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingProjectsComponent implements OnInit {
  public currentIndex = 0;
  public projects = [
    {
      id: 1,
      name: 'Alexandre',
      image: 'assets/images/landing/avatar1.png',
      description:
        'Interessante a facilidade em buscar as receitas, bem intuitivo.',
    },
    {
      id: 2,
      name: 'Pedro',
      image: 'assets/images/landing/avatar2.png',
      description:
        'Amei a facilidade em cadastrar uma receita minha, espero que gostem.',
    },
    {
      id: 3,
      name: 'Julius',
      image: 'assets/images/landing/avatar3.png',
      description: 'Muito bonita a interface, bem amigável.',
    },
  ];
  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-1', 'translate-x-0');
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(document.querySelector('#projects'));
    window.addEventListener('scroll', () => {
      const element = document.getElementById('projects');
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

  next() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - 1;
    }
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }
}
