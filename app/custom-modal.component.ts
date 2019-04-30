import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Portal } from '@angular/cdk/portal';

@Component({
  selector: 'app-custom-modal',
  template: `
    <div class="custom-modal-container">
      <div class="custom-modal">
        <ng-template [cdkPortalOutlet]="portal"></ng-template>
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomModalComponent {
  public portal: Portal<any>;
}
