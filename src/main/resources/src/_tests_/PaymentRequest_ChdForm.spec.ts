import { chdFormResponse, doc } from '../__mocks__/MockResponseConstants';
import { PaymentService } from '../__mocks__/PaymentService';
const paymentObj = new PaymentService();
const tag = 'data-chd';

test('chdForm method of Payment Request for card payment', () => {
  let chd = {};
  chd = paymentObj.chdForm(doc, tag);
  expect(chd).toEqual(chdFormResponse);
});
