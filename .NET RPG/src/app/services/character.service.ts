import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICharacter } from '../ICharacter';
import { environmet } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private endpoint = 'Character';
  private apiUrl: string = "";

  constructor(private http: HttpClient) { 
    this.apiUrl = `${environmet.domain}${this.endpoint}`;
  }

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
