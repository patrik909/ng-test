import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { EventCountdownService } from '../event-countdown/event-countdown.service'
import { FitTextDirective } from '../ui/fit-text/fit-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FitTextDirective],
  providers: [EventCountdownService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public eventCountdownService: EventCountdownService) {}

  public setDate({ target }: Event): void {
    this.eventCountdownService.setDate((target as HTMLInputElement).value)
  }

  public setEvent({ target }: Event): void {
    this.eventCountdownService.setName((target as HTMLInputElement).value)
  }
}
