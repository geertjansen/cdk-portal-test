import {Component, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';

import {CustomModalService} from './custom-modal.service';

/**
 * @title Portal overview
 */
@Component({
  selector: 'cdk-portal-overview-example',
  templateUrl: 'cdk-portal-overview-example.html',
  styleUrls: ['cdk-portal-overview-example.css'],
})
export class CdkPortalOverviewExample implements AfterViewInit {
  componentPortal: ComponentPortal<ComponentPortalExample>;

  constructor(private _viewContainerRef: ViewContainerRef, private customModalService: CustomModalService) {}

  ngAfterViewInit() {
    this.componentPortal = new ComponentPortal(ComponentPortalExample);
  }

  openCustomModal() {
    this.customModalService.open(ComponentPortalExample);
  }
}

@Component({
  selector: 'component-portal-example',
  template: '<mat-vertical-stepper><mat-step label="Step 1">Content 1</mat-step><mat-step label="Step 1">Content 2</mat-step></mat-vertical-stepper>'
})
export class ComponentPortalExample {}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */