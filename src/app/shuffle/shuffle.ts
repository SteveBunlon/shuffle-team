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
  standalone: true
})
export class Shuffle {
  shuffleForm: any;
  currentPeople: string[] = [];
  currentTeams: string[][] = [];
  parsedCurrentMatches: string[] = [];
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

      this.shuffle(this.currentPeople);

      for(const person of this.currentPeople) {
        this.playedWithAlready[person] = [person];
      }
    }

    this.pickMates();
  }

  reset(): void {
    this.currentPeople = [];
    this.shuffleForm.reset();
    this.currentTeams = [];
    this.parsedCurrentMatches = [];
    this.playedWithAlready = {};
    this.remainingMatches = 0;
  }

  pickMates() {
    this.currentTeams = [];

    const singlePersons = [...this.currentPeople];

    for (const am of singlePersons) {
      if (this.currentTeams.find(cm => cm.includes(am))) {
        continue;
      }

      const possibleMates = singlePersons.filter(p => !this.playedWithAlready[p].includes(am) && !this.currentTeams.find(cm => cm.includes(p)));
      const mate = possibleMates[0];

      this.playedWithAlready[am].push(mate);
      this.playedWithAlready[mate].push(am);

      this.currentTeams.push([am, mate]);
    }

    this.parsedCurrentMatches = [];
    for (let i = 0; i < this.currentTeams.length; i = i + 2) {
      this.parsedCurrentMatches.push(`${this.currentTeams[i]} vs ${this.currentTeams[i + 1]}`);
    }
    this.remainingMatches -= 1;
  }

  shuffle(array: string[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
