import { Pipe, PipeTransform } from '@angular/core';
import { ServiceStatusItem } from '../interfaces/service-status-item.interface';

@Pipe({
  name: 'statusIcon',
  pure: true,
})
export class ServiceStatusIconPipe implements PipeTransform {
  transform(serviceStatusItem: ServiceStatusItem): string {
    return serviceStatusItem.healthStatus === 'UP' ? '✅' : '❌';
  }
}
