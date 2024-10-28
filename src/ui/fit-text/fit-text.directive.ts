import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core'
import fitty, { FittyInstance } from 'fitty'

@Directive({
  standalone: true,
  selector: '[fitText]',
})
export class FitTextDirective implements AfterViewInit, OnDestroy {
  private fittyInstance: FittyInstance | undefined

  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    this.fittyInstance = fitty(this.el.nativeElement, {
      maxSize: 80,
      multiLine: false,
    })
  }

  public ngOnDestroy(): void {
    if (this.fittyInstance) {
      this.fittyInstance.unsubscribe()
    }
  }
}
