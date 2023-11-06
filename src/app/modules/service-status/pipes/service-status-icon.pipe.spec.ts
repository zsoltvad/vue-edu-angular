import { ServiceStatusIconPipe } from './service-status-icon.pipe';
import { ServiceStatusItem } from '../interfaces/service-status-item.interface';

describe('ServiceStatusIconPipe', () => {
  let pipe: ServiceStatusIconPipe;
  let serviceStatusItem: ServiceStatusItem;

  beforeEach(() => {
    pipe = new ServiceStatusIconPipe();
  });

  describe(`when status item's health status is 'UP' `, () => {
    beforeEach(() => {
      serviceStatusItem = { updatedAt: '2023-11-06', healthStatus: 'UP' };
    });

    it(`should return '✅'`, () => {
      expect(pipe.transform(serviceStatusItem)).toEqual('✅');
    });
  });

  describe(`when status item's health status is 'UP' `, () => {
    beforeEach(() => {
      serviceStatusItem = { updatedAt: '2023-11-06', healthStatus: 'DOWN' };
    });

    it(`should return '❌'`, () => {
      expect(pipe.transform(serviceStatusItem)).toEqual('❌');
    });
  });
});
