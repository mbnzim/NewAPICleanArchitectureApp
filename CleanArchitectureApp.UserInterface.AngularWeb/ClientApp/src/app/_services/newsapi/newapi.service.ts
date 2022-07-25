import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewapiService {
  api_key = '2b0f0d99644d4ec68cd72722dfb7cce6';
  baseUrlApi = 'https://newsapi.org/v2/top-headlines?';

  constructor(private http: HttpClient) {}

  //get Article by Country
  getArticleByCountryResource(country: string): Observable<any> {
    return this.http.get(
      `${this.baseUrlApi}country=${country}&apiKey=${this.api_key}`
    );
  }

  //get Article by Country and Category
  getArticleByCountryAndCatagoryResource(
    country: string,
    category: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrlApi}country=${country}&category=${category}&apiKey=${this.api_key}`
    );
  }

  //get Article by Country and Category
  getArticleBySourceResource(sources: string): Observable<any> {
    return this.http.get(
      `${this.baseUrlApi}sources=${sources}&apiKey=${this.api_key}`
    );
  }
}
