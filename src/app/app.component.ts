import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { interval, map, Observable, of, Subject, switchMap } from 'rxjs'

type CountDownProperties = { days: number; hours: number; minutes: number; seconds: number }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  event$: Subject<string> = new Subject()

  date$: Subject<Date> = new Subject()

  countDown$: Observable<CountDownProperties | null>

  constructor() {
    this.countDown$ = of(null)
    this.date$.next(new Date())
    this.event$.next('')
  }

  ngOnInit() {
    // Stop interval when date is passed
    this.countDown$ = this.date$.pipe(
      switchMap(date => interval(1000).pipe(map(() => this.getTimeLeft(date)))),
    )
  }

  setDate($event: Event) {
    const { value } = $event.target as HTMLInputElement
    this.date$.next(new Date(value))
  }

  setEvent($event: Event) {
    // Should this be triggered on every value change? Currently changing on blur
    const { value } = $event.target as HTMLInputElement
    this.event$.next(value)
  }

  private getTimeLeft(currentDate: Date): CountDownProperties {
    const now = new Date().getTime()
    const distance = currentDate.getTime() - now

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
