import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CustomModalComponent } from './custom-modal.component';

export class CustomModalRef<T> {
  private readonly afterClosedSubject = new Subject<void>();
  private readonly afterOpenedSubject = new Subject<void>();
  public readonly config: CustomModalConfig;
  constructor(
    private componentRef: ComponentRef<CustomModalComponent>,
    config?: CustomModalConfig
  ) {
    this.config = { data: {}, ...config };
  }
  afterClosed() {
    return this.afterClosedSubject.asObservable();
  }
  afterOpen(): Observable<void> {
    return this.afterOpened();
  }
  afterOpened() {
    return this.afterOpenedSubject.asObservable();
  }
  close() {
    const { nativeElement } = this.componentRef.location;
    this.componentRef.destroy();
    nativeElement.parentElement.removeChild(nativeElement);
    this.afterClosedSubject.next();
    this.afterClosedSubject.complete();
  }
}

export interface CustomModalConfig {
  data?: {} | null;
}
