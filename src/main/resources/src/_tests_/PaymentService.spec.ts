import mock from 'xhr-mock';
import {
  chdFormResponse,
  doc,
  paymentServiceObject
} from '../__mocks__/MockResponseConstants';
import { PaymentService } from '../PaymentService';
const successResponse = {
  encResponse:
    'Bh2ORvQAAAPsDFW4QJmd7dqa4VprPKegflpX2NgoF-K6etcP_xOQaC5J6kYmRIlwqN04q4YhEdYf8z7zNrhc53owL-vQFg0X3kK-9P86zI-q_Aj5AvlVBxO17gaAm8u6NJrooee_u0GqAIO13Ra33oBBxAvuuBMD09WgJ-YnY4KaENjT0xA0msIU1cwsG9tkiHx-1EAMUGnMfH2Db_-dE2yc-lqpponBaSWHM3JtZA30ByJ0H9S4J7vkRgyG-VZK87Vn9OlrgAfm-iQCX0GDwjOdbM0vmIysvDCP1SacMtulu3W7B1cdQMo7jFUR2H-M6RvlkQFsOVQFvRxBSQA27lZz1M8zleagbqh8MeNJIuQXlgxpAwf5fNV-ZbDnzyB9qM-GDfmDY8vM_MkpZ3Sx2lX88b4s0crwoX_4NEjy2A6TPI6be-Yh-D_Np8KipVnl4AAIewTSLKJplPlNnsFkzKJULD3JJN7k_oNGq33JzkZntqVkZn2frZkIIKQMjiQa0H3jL3-WjdkmmG1NdvL6LdbJmZhPcnHjRUdfZwiXKOMTXubFGL1lLxQaN4urzJFZpTRSW2A05gR8O6pkSx6V0A4JjtPOvF1HFJxfHvgmmEXCzuueVDb7BJOvIwtXCwT7hpr0kAiPrXJtEY-Tk8ncj938NiEpBgslq_gPIWQrZdNNXNuNxnZobkl6hTCjZxfwD7PMduyfgaQzi7gcRlcUaqpp-hKWuLSZ_2BqaWrSUtWxzseup7AgEVxsRM5-WwqfYb3cQSaOkN2CGRfEM6k_EOigji3dU-6hcRrUoLgjFE1A9nAQp7doteJn3vZUbkBOJzxZw0pmJUzU64EIKGS-y9gqv8PEJzz-iLFjPas1X0ccvpvHCFtBJuDQwXSU7csDBitk9MvI0Ppq0AuG9NAVBGzMH41AYKLyFFUqt8LhVmUNLmjQZTQLuB1I2IKnVZJiVqiVEuv8CBm9zZkoTxWoOt5JVSUPZnBAEG3hDZOSlMC5iXFhccdop-iypS3tt6vZMWFP2JYtnpuH'
};
const deviceAPIObj = {
  deviceEndpoint: 'http://localhost:9354/api/v1/initauthentication',
  encryptedPayload:
    'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe'
};
const errResponse = {
  status: 0,
  statusText: 'Could not send transaction.'
};

let serviceRequest: PaymentService;
describe('API calling', () => {
  beforeEach(() => {
    serviceRequest = new PaymentService(deviceAPIObj);
    mock.setup();
  });

  afterEach(() => {
    mock.teardown();
  });

  it('Should make success post request of send()', async () => {
    serviceRequest.initAuth();
    mock.post('http://localhost:9354/api/v1/initauthentication', (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify(successResponse));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await serviceRequest.send();
    expect(spy).toBeCalledWith(
      JSON.stringify({ encryptedPayload: deviceAPIObj.encryptedPayload })
    );
  });

  it('Should make error post request of send()', async () => {
    mock.error(() => {
      /* do nothing */
    });
    try {
      await serviceRequest.send();
    } catch (err) {
      expect(err).toEqual(errResponse);
    }
  });

  it('chdForm method of Payment Service for card payment', () => {
    const tag = 'data-chd';
    let chd = {};
    chd = serviceRequest.chdForm(doc, tag);
    expect(chd).toEqual(chdFormResponse);
  });

  it('should call getEndpoint method from the constructor of PaymentService class', () => {
    expect(serviceRequest).toEqual(paymentServiceObject);
  });
});
