jest.mock("../ProcessRequest");
jest.mock("../AlternatePaymentRequest");
import {
  ibpResponse,
  sendPaymentResponse
} from "../__mocks__/MockResponseConstants";
import { AlternatePaymentRequest } from "../AlternatePaymentRequest";
const deviceAPIObj = {
  encryptedPayload:
    "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
  endpoint: "http://localhost:9354"
};
const worldlineSessionData = "";
const alternatePayment = new AlternatePaymentRequest(
  deviceAPIObj,
  worldlineSessionData
);
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
