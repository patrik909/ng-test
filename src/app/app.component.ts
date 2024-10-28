import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'
import { EventCountdownService } from '../event-countdown/event-countdown.service'
import { FitTextDirective } from '../ui/fit-text/fit-text.directive'
import { InputComponent } from '../ui/input/input.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FitTextDirective, InputComponent],
  providers: [EventCountdownService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly PERSIST_DATE_KEY = 'event_date'

  private readonly PERSIST_NAME_KEY = 'event_name'

  constructor(public eventCountdownService: EventCountdownService) {}

  get emptyNameString(): string {
    return `What is the event's name?`
  }

  get emptyDateString(): string {
    return this.eventCountdownService.isExpired ? 'The date is expired =(' : 'What is the date?'
  }

  ngAfterViewInit(): void {
    const persistedDate = this.getPersistedData(this.PERSIST_DATE_KEY)
    const persistedName = this.getPersistedData(this.PERSIST_NAME_KEY)
    if (persistedDate) this.eventCountdownService.setDate(persistedDate)
    if (persistedName) this.eventCountdownService.setName(persistedName)
  }

  public setDate(value: string): void {
    this.persistData(this.PERSIST_DATE_KEY, value)
    this.eventCountdownService.setDate(value)
  }

  public setName(value: string): void {
    this.persistData(this.PERSIST_NAME_KEY, value)
    this.eventCountdownService.setName(value)
  }

  private persistData(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  private getPersistedData(key: string): string | null {
    return localStorage.getItem(key)
  }
}
