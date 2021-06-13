import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

import { Character } from './character'
import { CHARACTERS } from './mock-characters'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private charactersURL = 'api/characters'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  // HTTP Methods for get, put, etc

  getCharacters(): Observable<Character[]> {
    // const characters = of(CHARACTERS)
    // this.messageService.add('CharacterService: fetched characters')
    return this.http.get<Character[]>(this.charactersURL)
      .pipe(
        tap(_ => this.log('fetched characters')),
        catchError(this.handleError<Character[]>('getCharacters', []))
      )
  }

  getCharacter(id: number): Observable<Character> {
    // const character = CHARACTERS.find(c => c.id ===id)!
    // this.messageService.add(`CharacterService: fetched selected character using id=${character.id}`)
    // return of(character)
    const url = `${this.charactersURL}/${id}`
    return this.http.get<Character>(url)
      .pipe(
        tap(_ => this.log(`fetched character with id=${id}`)),
        catchError(this.handleError<Character>(`getCharacters id =${id}`))
      )
  }

  updateCharacter(character: Character){
    return this.http.put(this.charactersURL, character, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated character with id=${character.id}`)),
        catchError(this.handleError<Character>(`updateCharacters id =${character.id}`))
      )
  }

  addCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.charactersURL, character, this.httpOptions)
    .pipe(
      tap((newCharacter: Character) => this.log(`added new character with id=${newCharacter.id}`)),
      catchError(this.handleError<Character>('addHero'))
    );
  }

  deleteCharacter(id: number): Observable<Character> {
    const url = `${this.charactersURL}/${id}`
    return this.http.delete<Character>(url)
      .pipe(
        tap(_ => this.log(`fetched character with id=${id}`)),
        catchError(this.handleError<Character>(`deleteCharacter`))
      )
  }

  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      return of([])
    }
    return this.http.get<Character[]>(`${this.charactersURL}/?name=${term}`)
      .pipe(
        tap(x => x.length?
            this.log(`found characters matching "${term}`) :
            this.log(`no characters matching "${term}`)
            ),
        catchError(this.handleError<Character[]>('searchCharacters', []))
      )
  }

  // Error Handling & Logging

  private log(message: string) {
    this.messageService.add(`CharactersService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {

      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}
