import { Injectable } from '@angular/core'
import { interval, map, Observable, Subject, switchMap } from 'rxjs'
import { EventCountdown } from './event-countdown.types'

@Injectable()
export class EventCountdownService {
  public date$: Subject<string> = new Subject()

  public name: string | null = null

  public timeLeft$: Observable<EventCountdown | null> = this.startCountdown()

  public isExpired: boolean = false

  public setDate(value: string) {
    this.date$.next(value)
  }

  public setName(value: string) {
    this.name = value
  }

  private startCountdown() {
    return this.date$.pipe(
      switchMap(date =>
        interval(1000).pipe(
          map(() => {
            const timeLeft = this.getTimeLeft(date)
            this.isExpired = timeLeft === null
            return timeLeft
          }),
        ),
      ),
    )
  }

  private getTimeLeft(currentDate: string): EventCountdown | null {
    const now = new Date().getTime()
    const distance = new Date(currentDate).getTime() - now

    if (distance < 0) {
      return null
    }

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
