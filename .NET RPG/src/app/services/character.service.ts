import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICharacter } from '../ICharacter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://localhost:7087/api/Character';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteCharacter(ICharacter: ICharacter): Observable<ICharacter>{
    const url = `${this.apiUrl}/${ICharacter.id}`;
    return this.http.delete<ICharacter>(url);
  }
  
  updateCharacterReminder(ICharacter: ICharacter): Observable<ICharacter>{
    const url = `${this.apiUrl}/${ICharacter.id}`;
    return this.http.put<ICharacter>(url, ICharacter, httpOptions);
  }

  addCharacter(ICharacter: ICharacter): Observable<ICharacter>{
    return this.http.post<ICharacter>(this.apiUrl, ICharacter, httpOptions);
  }
}
