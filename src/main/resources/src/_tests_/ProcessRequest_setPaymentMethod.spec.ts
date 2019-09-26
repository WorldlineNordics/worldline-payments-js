jest.mock("../ProcessRequest");
import {
  cardPaymentEndpointUrl,
  ibpEndpointUrl
} from "../__mocks__/MockResponseConstants";
import { ProcessRequest } from "../ProcessRequest";

const deviceAPIObj = {
  encryptedPayload:
    "BgAAA-wdjkb0DYTHKakkOQSmhf87QmWdFFRKHnmcJ7gtfap0b4…mgeBBukLcu_62R9bommN6fanXhhjltfjGVQ9HzHCFk5dW_w==",
  endpoint: "http://localhost:9354"
};
const worldlineSessionData =
  "AThlkCHdnzydrj_2ambZsdCuVjzouINihWfLrWnz5TVeriGCsZ-zzj2dl7eAQbUtIfNLLWe24HRd8mk8X_zzwb7v0EEk=";

const processObj = new ProcessRequest(deviceAPIObj, worldlineSessionData);

test("setPaymentMethodType method for card", () => {
  const response = processObj.setPaymentMethodType("card");
  expect(response).toEqual(cardPaymentEndpointUrl);
});

test("setPaymentMethodType method for ibp", () => {
  const response = processObj.setPaymentMethodType("ibp");
  expect(response).toEqual(ibpEndpointUrl);
});
