import { Component, OnInit } from '@angular/core';
import { Language } from '../model/language';
import { HttpService } from '../services/http-service'
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})

export class LanguageComponent implements OnInit {
  languages: Language[] = []
  language: Language = new Language()

  constructor(private httpService: HttpService,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private uriBuilderService: UriBuilderService) { }

    readonly DEFAULT_LANGUAGE_ID = 1

  ngOnInit(): void {
    this.getLanguages()
    this.language.languageId = parseInt(this.cookieService.get('languageId'))
    if(!this.language.languageId)
      this.language.languageId = this.DEFAULT_LANGUAGE_ID
  }

  getLanguages() {
    this.httpService
    .get(this.uriBuilderService.getLanguageUri())
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
