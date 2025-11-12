import { Component } from '@angular/core';
import { Shuffle } from './shuffle/shuffle';

@Component({
  selector: 'app-root',
  imports: [Shuffle],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {}
