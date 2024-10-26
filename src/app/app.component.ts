import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { interval, map, Observable, of, switchMap } from 'rxjs'

type CountDownProperties = { days: number; hours: number; minutes: number; seconds: number }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  time = of(new Date('2025-01-01').getTime())

  countDown$: Observable<CountDownProperties | null>

  constructor() {
    this.countDown$ = of(null)
  }

  ngOnInit() {
    this.countDown$ = this.time.pipe(
      switchMap(time => interval(1000).pipe(map(() => this.getTimeLeft(time)))),
    )
  }

  private getTimeLeft(currentTime: number): CountDownProperties {
    const now = new Date().getTime()
    const distance = currentTime - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }
}
