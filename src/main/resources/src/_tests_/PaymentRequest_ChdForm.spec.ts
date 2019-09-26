import { chdFormResponse, doc } from "../__mocks__/MockResponseConstants";
import { PaymentRequest } from "../PaymentRequest";
const deviceAPIObj = {};
const worldlineSessionData = "";
const paymentObj = new PaymentRequest(deviceAPIObj, worldlineSessionData);
const tag = "data-chd";

test("chdForm method of Payment Request for card payment", () => {
  let chd = {};
  chd = paymentObj.chdForm(doc, tag);
  expect(chd).toEqual(chdFormResponse);
});
