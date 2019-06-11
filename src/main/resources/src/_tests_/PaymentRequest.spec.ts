
jest.mock('../ProcessRequest');
jest.mock('../PaymentRequest');
import { PaymentRequest } from '../PaymentRequest';
var paymentObj = new PaymentRequest();
var endpointUrl = "/api/v1/payments";
var data;

test("To test send method of card", () => {
  var result = paymentObj.send();
  expect(result).toEqual({
    method: "POST",
    endpointUrl: "/api/v1/payments",
    cardHolderName: "John",
    cardNumber: "4444333322221111",
    expDateMonth: 12,
    expDateYear: 2020,
    cvCode: 123,
    encryptedPayload: "BgAAA-wdjkb0U8pmrC4z54WxjQGgl6gCCAEQ8cnASAWyHHkzvCVNx5Nx3B6b4MU-9Z6E0JxmPmzce6QVstabD89L7fghOXBe5IXncvXlb2eyKJlPUH1saTHb2cziOZxL5NZ4Qc9piqAdp8S-YKndICs1Mh6TFWblcW4ZSroFiII4ABWSASrPzj7uSR-lv6sDOlhohCo07pvMrZBOPlPzv4lz5cQ4IDeXE-QOkYfeoc58txeuPLPZiyw0L5wQlopRPwRgSFheejkg6c1IRkg56sSI7VZ4zfQ4CepzM_T85oQ5jtj3W60znkr6eplQyuJBwqDhuvE97lTD1bh536yZkqhHLdJOmN4GmSlaJ0rcXePq8X_S-X6hCuGldQSJ3TH5h-PL-QMDy4XuBtF0HS_KGm_HDac2Bd_TU4wVVHJB9LuxTlaychk4Xp7vUkkcO_P5xX4hLv_TkaREwHgxJ7lM26WS1kQAty4NFtQPZEruQcxnI-AvOhNmxgGM-4JtBomsezSkXY0Ent2WjHt-ATqgq8fMQ94p-CHB7MuSOI60HH2fyXkjgImzBlnBhO7EpGBqzLuqY6WMuRcSd2aJ9u0KIZXabY1aYzh8kCUh6s9xtBcZL4qo4vQUrIGWSOxKQA5HEGiLwQ1-epTT-d2dFiNZAUKQI_UP6yDWs4NFjisYlvUhibpQNoMDRhdEyJXE83W4cdbdkUYF95k3UT3S6vQvvW7mSd9w7LQgzjbFQYjcbVZbmTfWYwt77-KDkSQLiBRxs-15KK4UEEat38eWFZWAkwW20dfVYE_2ZAB2MEmQQu9W9Zs6JbZRYkFwUuFIrIFUWGWmhzcF66Pko4q2ybbeU2eIwOXe4WJigq_UPYEhLJUERk8HrIfPofJgxH97xKMo1Tb6GXboP0VA"
  });

  paymentObj.method = result.method;
  paymentObj.cardHolderName = result.cardHolderName;
  paymentObj.cardNumber = result.cardNumber;
  paymentObj.expDateMonth = result.expDateMonth,
  paymentObj.expDateYear = result.expDateYear,
  paymentObj.cvCode = result.cvCode,
  paymentObj.encryptedPayload = result.encryptedPayload


  data = JSON.stringify({
    cardHolderName: paymentObj.cardHolderName,
    cardNumber: paymentObj.cardNumber,
    expDateMonth: paymentObj.expDateMonth,
    expDateYear: paymentObj.expDateYear,
    cvCode: paymentObj.cvCode,
    encryptedPayload: paymentObj.encryptedPayload
  });
});

test("To test sendpayment method of card", () => {
  var response = paymentObj.sendPayment(endpointUrl, data, paymentObj.method);
  expect(response).toEqual({ status: 201, statusText: "success" });
});









