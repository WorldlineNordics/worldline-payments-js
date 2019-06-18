import { PaymentRequest } from "../PaymentRequest";
import { doc, chdFormResponse } from "./MockResponseConstants";
const paymentObj = new PaymentRequest();
const tag = "data-chd";

test("chdForm method of Payment Request for card payment", () => {
  let chd = {};
  chd = paymentObj.chdForm(doc, tag);
  expect(chd).toEqual(chdFormResponse);
});
