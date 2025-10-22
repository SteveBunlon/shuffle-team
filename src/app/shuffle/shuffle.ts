import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatButton,
  MatButtonModule
} from '@angular/material/button';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-shuffle',
  imports: [MatFormFieldModule, MatInputModule, MatButton, ReactiveFormsModule, MatButtonModule],
  templateUrl: './shuffle.html',
  styleUrl: './shuffle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shuffle {
  shuffleForm: any;
  currentPeople: string[] = [];
  currentMatches: string[] = [];
  playedWithAlready: Record<string, String[]> = {}
  remainingMatches: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.shuffleForm = formBuilder.group({
      people: '',
    });
  }

  onSubmit(): void {
    if (!this.currentPeople.length) {
      this.currentPeople = this.shuffleForm.get('people')?.value.split(',');
      this.remainingMatches = this.currentPeople.length - 1;

      for(const person of this.currentPeople) {
        this.playedWithAlready[person] = [person];
      }
    }

    this.pickMates();
  }

  reset(): void {
    this.currentPeople = [];
    this.shuffleForm.reset();
    this.currentMatches = [];
    this.playedWithAlready = {};
    this.remainingMatches = 0;
  }

  pickMates() {
    this.currentMatches = [];

    const singlePersons = [...this.currentPeople];

    for (const am of singlePersons) {
      if (this.currentMatches.includes(am)) {
        continue;
      }

      const possibleMates = singlePersons.filter(p => !this.playedWithAlready[p].includes(am) && !this.currentMatches.includes(p));
      const mate = possibleMates[0];

      this.playedWithAlready[am].push(mate);
      this.playedWithAlready[mate].push(am);

      this.currentMatches.push(am);
      this.currentMatches.push(mate);
    }

    this.remainingMatches -= 1;
  }
}
