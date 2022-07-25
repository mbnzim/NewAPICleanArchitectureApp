import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { NewapiService } from '../../_services/newsapi/newapi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private newsapi: NewapiService // public formGroup: FormGroup
  ) {
    this.user = this.authenticationService.userValue;
  }

  user: User | null;
  mArticles: Array<any> = [];
  mSources: Array<any> = [];

  selectedOption: string = '';
  countryName: string = '';
  categoryName: string = '';
  sourceName: string = '';

  Countries = [
    { key: 'za', value: 'South Africa' },
    { key: 'ca', value: 'Canada' },
    { key: 'cn', value: 'China' },
    { key: 'fr', value: 'France' },
    { key: 'mx', value: 'Mexico' },
    { key: 'mz', value: 'Mozambique' },
    { key: 'us', value: 'United States of America' },
    { key: 'tn', value: 'Tunisia' },
    { key: 'ng', value: 'Nigeria' },
  ];

  Sources = [
    { key: 'news24', value: 'News24' },
    { key: 'bbc-news', value: 'BBC NEW' },
    { key: 'cnn', value: 'CNN' },
    { key: 'fox-news', value: 'Fox News' },
    { key: 'cbs-news', value: 'CBS News' },
    { key: 'the-wall-street-journal', value: 'The Wall Street Journal' },
    { key: 'reuters', value: 'Reuters' },
    { key: 'politico', value: 'Politico' },
  ];

  Categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  ngOnInit(): void {
    this.getArticleByCountry('za');
  }

  changeCountry(e: any) {
    console.log(e.target.value);
    this.countryName = e.target.value;
  }

  changeCategory(e: any) {
    console.log(e.target.value);
    this.categoryName = e.target.value;
  }

  changeSource(e: any) {
    console.log(e.target.value);
    this.sourceName = e.target.value;
  }

  onSubmit() {
    if (
      this.countryName != '' &&
      this.categoryName != '' &&
      this.sourceName == ''
    )
      this.getArticleByCountryAndCatagory(this.countryName, this.categoryName);

    if (
      this.countryName != '' &&
      this.categoryName == '' &&
      this.sourceName == ''
    )
      this.getArticleByCountry(this.countryName);

    if (
      this.sourceName != '' &&
      this.categoryName == '' &&
      this.countryName == ''
    )
      this.getArticleBySource(this.sourceName);
  }

  getArticleByCountry(country: string) {
    this.newsapi.getArticleByCountryResource(country).subscribe((data) => {
      this.mArticles = data['articles'];
      console.log(data);
    });
  }

  getArticleByCountryAndCatagory(country: string, category: string) {
    this.newsapi
      .getArticleByCountryAndCatagoryResource(country, category)
      .subscribe((data) => {
        this.mArticles = data['articles'];
        console.log(data);
      });
  }

  getArticleBySource(source: string) {
    this.newsapi.getArticleBySourceResource(source).subscribe((data) => {
      this.mArticles = data['articles'];
      console.log(data);
    });
  }
}
