import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'data.json';  // URL to web api
  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService:Fetching heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeros', [])))
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
