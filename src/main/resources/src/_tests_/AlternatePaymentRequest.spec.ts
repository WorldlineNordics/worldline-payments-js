jest.mock("../ProcessRequest");
jest.mock("../AlternatePaymentRequest");
import { AlternatePaymentRequest } from "../AlternatePaymentRequest";
import { ibpResponse, sendPaymentResponse } from "./MockResponseConstants";

const alternatePayment = new AlternatePaymentRequest();
let data;

test("send method of ibp", () => {
  const result = alternatePayment.send();
  expect(result).toEqual(ibpResponse);
  alternatePayment.method = result.method;
  alternatePayment.paymentMethodId = result.paymentMethodId;
  alternatePayment.encryptedPayload = result.encryptedPayload;
  alternatePayment.endpoint = result.endpoint;
  data = JSON.stringify({
    encryptedPayload: alternatePayment.encryptedPayload,
    paymentMethodId: alternatePayment.paymentMethodId
  });
});

test("sendPayment method of alternate payment method", () => {
  const response = alternatePayment.sendPayment(
    alternatePayment.endpoint,
    data,
    alternatePayment.method
  );
  expect(response).toEqual(sendPaymentResponse);
});
