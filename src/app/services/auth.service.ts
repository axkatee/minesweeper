import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isLoggedIn(): Promise<boolean> {
    const name = localStorage.getItem('name');
    return new Promise(resolve => {
      return resolve(!!name);
    });
  }

  public setNameToLocalStorage(name: string): void {
    localStorage.setItem('name', JSON.stringify(name));
  }

  public removeNameFromLocalStorage(): void {
    localStorage.removeItem('name');
  }
}
