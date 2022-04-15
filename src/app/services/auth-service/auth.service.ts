import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isLoggedIn(): boolean {
    const name = localStorage.getItem('name');
    return !!name;
  }

  public setNameToLocalStorage(name: string): void {
    localStorage.setItem(LocalStorageKey.name, JSON.stringify(name));
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }
}
