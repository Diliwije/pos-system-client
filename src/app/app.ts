import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingStatus} from './services/loading-status';
import {Loading} from './components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('pos-system-client');
  public statusService=inject(LoadingStatus)
}
