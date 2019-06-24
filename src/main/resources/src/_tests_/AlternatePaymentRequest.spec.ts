jest.mock("../ProcessRequest");
jest.mock("../AlternatePaymentRequest");
import { AlternatePaymentRequest } from "../AlternatePaymentRequest";
import {
  eftResponse,
  ewalletResponse,
  ibpResponse,
  sendPaymentResponse
} from "./MockResponseConstants";

const alternatePayment = new AlternatePaymentRequest();
let data;

test("send method of eft", () => {
  const result = alternatePayment.send("eft");
  expect(result).toEqual(eftResponse);
  alternatePayment.method = result.method;
  alternatePayment.paymentMethodId = result.paymentMethodId;
  alternatePayment.encryptedPayload = result.encryptedPayload;
  alternatePayment.endpoint = result.endpoint;
});

test("send method of ibp", () => {
  const result = alternatePayment.send("ibp");
  expect(result).toEqual(ibpResponse);
  alternatePayment.method = result.method;
  alternatePayment.paymentMethodId = result.paymentMethodId;
  alternatePayment.encryptedPayload = result.encryptedPayload;
  alternatePayment.endpoint = result.endpoint;
});

test("send method of ewallet", () => {
  const result = alternatePayment.send("ewallet");
  expect(result).toEqual(ewalletResponse);
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
