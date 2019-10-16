import { chdFormResponse, doc } from '../__mocks__/MockResponseConstants';
import { PaymentService } from '../PaymentService';
const deviceAPIObj = {
  encryptedPayload:
    'BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==',
  endpoint: 'http://localhost:9354'
};
const paymentObj = new PaymentService(deviceAPIObj);
const tag = 'data-chd';

test('chdForm method of Payment Request for card payment', () => {
  let chd = {};
  chd = paymentObj.chdForm(doc, tag);
  expect(chd).toEqual(chdFormResponse);
});
