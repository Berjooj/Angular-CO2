import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showFiller = false;

  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  constructor(private translator: TranslateService) {
    translator.addLangs(['pt-BR', 'en']);
    translator.setDefaultLang('pt-BR');
  }

  ngOnInit(): void {
  }

  updateLanguage(language: string): void {
    this.translator.use(language);
  }

  // scroll(el: HTMLElement) {
  //   console.log(el)
  //   el.scrollIntoView();
  // }
}
