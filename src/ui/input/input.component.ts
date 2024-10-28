import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'input-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <label *ngIf="label" [for]="id">{{ label }}</label>
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInputChange($event)"
      />
    </div>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() id: string = ''
  @Input() label?: string
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() value: string | null = ''
  @Output() valueChange = new EventEmitter<string>()

  public onInputChange({ target }: Event): void {
    const { value } = target as HTMLInputElement
    this.value = value
    this.valueChange.emit(value)
  }
}
