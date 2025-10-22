import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shuffle } from './shuffle/shuffle';

@Component({
  selector: 'app-root',
  imports: [Shuffle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
