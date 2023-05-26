import 'zone.js/dist/zone';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { StateService } from './state.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, mergeMap, startWith } from 'rxjs';
import { PipeBolBoldLetterPipe } from './bold-letter.pipe';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeBolBoldLetterPipe,
  ],
  template: `
    <input [formControl]='filter' placeholder="Search city ...">
    <ul>
    <li 
      *ngFor="let state of list$ | async" 
      [innerHTML]="state.name | boldLetter :filter.value">
    </li>
    </ul>
  `,
  providers: [StateService],
})
export class App {
  #state = inject(StateService);

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''));

  states$ = this.#state.getState$();
  list$ = combineLatest([this.states$, this.filter$]).pipe(
    map(([states, filter]) =>
      states.filter((state) =>
        state.name.toLowerCase().includes(filter?.toLowerCase() || '')
      )
    )
  );
}

bootstrapApplication(App);
