import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  set(key: string, value: any) {
    try {
      const storage = {
        value,
        creationDate: new Date()
      }
      localStorage.setItem(key, JSON.stringify(storage))
    } catch(error) {
      console.error('ERROR:', error)
    }

  }


  get(key: string) {
    try {
      const storage = localStorage.getItem(key) && localStorage.getItem(key) !== '' ? JSON.parse(localStorage.getItem(key)) : { value: null }
      return storage.value
    } catch (error) {
      console.error('ERROR:', error)
      return null
    }

  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
}
