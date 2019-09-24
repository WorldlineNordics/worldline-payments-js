jest.mock("../ProcessRequest");
jest.mock("../PaymentRequest");
import { PaymentRequest } from "../PaymentRequest";
import { ProcessRequest } from "../ProcessRequest";
import {
  cardPaymentEndpointUrl,
  cardResponse,
  deviceAPIResponse,
  sendPaymentResponse,
  worldlineSessionDataResponse
} from "./MockResponseConstants";

const paymentObj = new PaymentRequest();
const processObj = new ProcessRequest();
const endpointUrl = "/api/v1/payments";
let data;

const deviceAPIObj = {
  encryptedPayload:
    "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
  endpoint: "http://localhost:9354"
};
const worldlineSessionData =
  "AThlkCHdnzydrj_2ambZsdCuVjzouINihWfLrWnz5TVeriGCsZ-zzj2dl7eAQbUtIfNLLWe24HRd8mk8X_zzwb7v0EEk=";

test("send method of card", () => {
  const result = paymentObj.send();
  expect(result).toEqual(cardResponse);
  paymentObj.method = result.method;
  paymentObj.cardHolderName = result.cardHolderName;
  paymentObj.cardNumber = result.cardNumber;
  paymentObj.expDateMonth = result.expDateMonth;
  paymentObj.expDateYear = result.expDateYear;
  paymentObj.cvCode = result.cvCode;
  paymentObj.encryptedPayload = result.encryptedPayload;
  data = JSON.stringify({
    cardHolderName: paymentObj.cardHolderName,
    cardNumber: paymentObj.cardNumber,
    cvCode: paymentObj.cvCode,
    encryptedPayload: paymentObj.encryptedPayload,
    expDateMonth: paymentObj.expDateMonth,
    expDateYear: paymentObj.expDateYear
  });
});

test("sendPayment method of card", () => {
  const response = paymentObj.sendPayment(endpointUrl, data, paymentObj.method);
  expect(response).toEqual(sendPaymentResponse);
});

test("deviceApiRequest method with worldlineSessionData", () => {
  const response = processObj.deviceAPIRequest(
    deviceAPIObj,
    worldlineSessionData
  );
  expect(response).toEqual(worldlineSessionDataResponse);
});

test("deviceApiRequest method without worldlineSessionData", () => {
  const response = processObj.deviceAPIRequest(deviceAPIObj, "");
  expect(response).toEqual(deviceAPIResponse);
});

test("setPaymentMethodType method for card", () => {
  const response = processObj.setPaymentMethodType("card");
  expect(response).toEqual(cardPaymentEndpointUrl);
});
