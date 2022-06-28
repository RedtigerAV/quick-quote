import { Injectable } from '@angular/core';
import { LocalWebStorage } from './local-webstorage';
import { WebStorage } from './webstorage';

/**
 * Service for single access to browser storages
 */
@Injectable({ providedIn: 'root' })
export class WebStorageService {
  public readonly local: WebStorage;
  // Add SessionWebStorage

  constructor() {
    this.local = new LocalWebStorage();
  }
}
