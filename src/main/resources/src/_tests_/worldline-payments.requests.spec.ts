import { PaymentRequest } from '../worldline-payments.request';

test('PaymentRequest', () => {
  const paymentRequest = new PaymentRequest();
  paymentRequest.card({cardNumber: 1234});
  expect(paymentRequest.cardNumber).toEqual(1234);
});
