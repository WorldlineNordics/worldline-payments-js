jest.mock("../ProcessRequest");
jest.mock("../PaymentRequest");
import { PaymentRequest } from "../PaymentRequest";
import { cardResponse, sendPaymentResponse } from "./MockResponseConstants";
const paymentObj = new PaymentRequest();
const endpointUrl = "/api/v1/payments";
let data;

test("send method of card", () => {
  let result = paymentObj.send();
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
    expDateMonth: paymentObj.expDateMonth,
    expDateYear: paymentObj.expDateYear,
    cvCode: paymentObj.cvCode,
    encryptedPayload: paymentObj.encryptedPayload
  });
});

test("sendPayment method of card", () => {
  let response = paymentObj.sendPayment(endpointUrl, data, paymentObj.method);
  expect(response).toEqual(sendPaymentResponse);
});