jest.mock("../PaymentMethodRequest");
import {
  paymentMethodResponse,
  sendPaymentResponse
} from "../__mocks__/MockResponseConstants";
import { PaymentMethodRequest } from "../PaymentMethodRequest";
const deviceAPIObj = {
  encryptedPayload:
    "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
  endpoint: "http://localhost:9354"
};
const worldlineSessionData = "";
const paymentMethodObj = new PaymentMethodRequest(
  deviceAPIObj,
  worldlineSessionData
);
let data;

test("send method of PaymentMethodRequest to fetch  payment method of ibp", () => {
  const result = paymentMethodObj.send();
  expect(result).toEqual(paymentMethodResponse);
  paymentMethodObj.method = result.method;
  paymentMethodObj.endpoint = result.endpoint;
  paymentMethodObj.paymentMethodType = result.paymentMethodType;
  paymentMethodObj.encryptedPayload = result.encryptedPayload;
  data = JSON.stringify({
    encryptedPayload: paymentMethodObj.encryptedPayload,
    paymentMethodType: paymentMethodObj.paymentMethodType
  });
});

test("sendPayment method of PaymentMethodRequest", () => {
  const response = paymentMethodObj.sendPayment(
    paymentMethodObj.endpoint,
    data,
    paymentMethodObj.method
  );
  expect(response).toEqual(sendPaymentResponse);
});
