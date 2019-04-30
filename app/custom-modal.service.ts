import {
  Inject,
  Injectable,
  Injector,
  ComponentFactoryResolver,
  InjectionToken
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector
} from '@angular/cdk/portal';
import { CustomModalComponent } from './custom-modal.component';
import { CustomModalRef, CustomModalConfig } from './custom-modal.models';

export const CUSTOM_MODAL_DATA = new InjectionToken<{}>('CustomModalData');

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  open<T>(component: ComponentType<T>, config?: CustomModalConfig) {
    const viewerRef = this.attach(component, config);
    return viewerRef;
  }

  private attach<T>(component: ComponentType<T>, config?: CustomModalConfig) {
    const factory = this.resolver.resolveComponentFactory(CustomModalComponent);
    const componentRef = factory.create(this.injector, undefined, undefined);
    const { nativeElement } = componentRef.location;
    const ref = new CustomModalRef<T>(componentRef);
    const injector = this.createInjector(ref, config);
    componentRef.instance.portal = new ComponentPortal(
      component,
      undefined,
      injector
    );
    componentRef.hostView.detectChanges();
    this.document.body.appendChild(nativeElement);
    return ref;
  }

  private createInjector(
    layerRef: CustomModalRef<CustomModalComponent>,
    config?: CustomModalConfig
  ): PortalInjector {
    const data = config && config.data ? config.data : null;
    const injectorTokens = new WeakMap<any, any>([
      [CUSTOM_MODAL_DATA, data],
      [CustomModalRef, layerRef]
    ]);
    return new PortalInjector(this.injector, injectorTokens);
  }
}