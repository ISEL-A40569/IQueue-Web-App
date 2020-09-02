import { Component, OnInit } from '@angular/core';
import { Language } from '../model/language';
import { HttpService } from '../services/http-service'
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})

export class LanguageComponent implements OnInit {
  languages: Language[] = []
  language: Language = new Language()

  constructor(private httpService: HttpService,
    private translateService: TranslateService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getLanguages()
    this.language.languageId = parseInt(this.cookieService.get('languageId'))
    if(!this.language.languageId)
      this.language.languageId = 1
  }

  getLanguages() {
    this.httpService
    .get(`http://localhost:8080/api/iqueue/language`)
    // .get(`https://localhost:8443/api/iqueue/language`)
    .subscribe(response => {              
      for (const entry in response) {
        this.languages.push(response[entry])
      }
      console.log(this.languages)
    })
  }

  onSetLanguage() {    
    console.log(this.language.languageId)
    this.language.languageDescription = this.languages[this.language.languageId -1].languageDescription //TODO: can't do this in a nicer way!???
    console.log(this.language.languageDescription)
    this.setLanguage(this.language.languageDescription)
    this.cookieService.set('languageDescription', this.language.languageDescription)
    this.cookieService.set('languageId', this.language.languageId.toString())
  }

  setLanguage(language: string) {
    this.translateService.use(language)    
  }
}
