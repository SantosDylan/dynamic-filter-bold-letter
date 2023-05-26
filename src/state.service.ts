import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { state } from './state';

export class StateService {
  getState$(): Observable<{ name: string; id: number }[]> {
    return of(state);
  }
}
