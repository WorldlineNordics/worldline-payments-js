jest.mock("../PaymentMethodRequest");
import { PaymentMethodRequest } from "../PaymentMethodRequest";
import { paymentMethodResponse, sendPaymentResponse } from "./MockResponseConstants";
const paymentMethodObj = new PaymentMethodRequest();
let data;

test("send method of PaymentMethodRequest to fetch  payment method of ibp", () => {
  let result = paymentMethodObj.send();
  expect(result).toEqual(paymentMethodResponse);
  paymentMethodObj.method = result.method;
  paymentMethodObj.endpoint = result.endpoint;
  paymentMethodObj.paymentMethodType = result.paymentMethodType;
  paymentMethodObj.encryptedPayload = result.encryptedPayload;
  data = JSON.stringify({
    paymentMethodType: paymentMethodObj.paymentMethodType,
    encryptedPayload: paymentMethodObj.encryptedPayload
  });
});

test("sendPayment method of PaymentMethodRequest", () => {
  let response = paymentMethodObj.sendPayment(
    paymentMethodObj.endpoint,
    data,
    paymentMethodObj.method
  );
  expect(response).toEqual(sendPaymentResponse);
});
