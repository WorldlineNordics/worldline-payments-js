import jest from 'jest-mock';
import mock from 'xhr-mock';
import {
  chdFormResponse,
  doc,
  endpointUrl
} from '../__mocks__/MockResponseConstants';
import { PaymentService } from '../PaymentService';
const endpoint = 'http://localhost:9354/api/v1/payments';
const method = 'POST';
const successResponse = {
  encResponse:
    'Bh2ORvQAAAPsDFW4QJmd7dqa4VprPKegflpX2NgoF-K6etcP_xOQaC5J6kYmRIlwqN04q4YhEdYf8z7zNrhc53owL-vQFg0X3kK-9P86zI-q_Aj5AvlVBxO17gaAm8u6NJrooee_u0GqAIO13Ra33oBBxAvuuBMD09WgJ-YnY4KaENjT0xA0msIU1cwsG9tkiHx-1EAMUGnMfH2Db_-dE2yc-lqpponBaSWHM3JtZA30ByJ0H9S4J7vkRgyG-VZK87Vn9OlrgAfm-iQCX0GDwjOdbM0vmIysvDCP1SacMtulu3W7B1cdQMo7jFUR2H-M6RvlkQFsOVQFvRxBSQA27lZz1M8zleagbqh8MeNJIuQXlgxpAwf5fNV-ZbDnzyB9qM-GDfmDY8vM_MkpZ3Sx2lX88b4s0crwoX_4NEjy2A6TPI6be-Yh-D_Np8KipVnl4AAIewTSLKJplPlNnsFkzKJULD3JJN7k_oNGq33JzkZntqVkZn2frZkIIKQMjiQa0H3jL3-WjdkmmG1NdvL6LdbJmZhPcnHjRUdfZwiXKOMTXubFGL1lLxQaN4urzJFZpTRSW2A05gR8O6pkSx6V0A4JjtPOvF1HFJxfHvgmmEXCzuueVDb7BJOvIwtXCwT7hpr0kAiPrXJtEY-Tk8ncj938NiEpBgslq_gPIWQrZdNNXNuNxnZobkl6hTCjZxfwD7PMduyfgaQzi7gcRlcUaqpp-hKWuLSZ_2BqaWrSUtWxzseup7AgEVxsRM5-WwqfYb3cQSaOkN2CGRfEM6k_EOigji3dU-6hcRrUoLgjFE1A9nAQp7doteJn3vZUbkBOJzxZw0pmJUzU64EIKGS-y9gqv8PEJzz-iLFjPas1X0ccvpvHCFtBJuDQwXSU7csDBitk9MvI0Ppq0AuG9NAVBGzMH41AYKLyFFUqt8LhVmUNLmjQZTQLuB1I2IKnVZJiVqiVEuv8CBm9zZkoTxWoOt5JVSUPZnBAEG3hDZOSlMC5iXFhccdop-iypS3tt6vZMWFP2JYtnpuH'
};
const deviceAPIObj = {
  deviceEndpoint: '/api/v1/payments',
  encryptedPayload:
    'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe'
};
const errResponse = {
  status: 0,
  statusText: 'Could not send transaction.'
};

const serviceRequest = new PaymentService('deviceAPIObj');

describe('API calling', () => {
  beforeEach(() => {
    mock.setup();
  });
  const data = JSON.stringify({
    cardHolderName: 'John',
    cardNumber: '4444333322221111',
    cvCode: 123,
    encryptedPayload:
      'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJeiiFC97jgpzsWjW-71lLAlyqb2jQh_SWNZzaLqsRqjeSAe6wWaat6y66ljFGEeuqqBczCRIY84V7YXiibunYH6xkhE8SN5wPUB2KNpGSeNI2gZT2n1wvOaMXXsl3ZugpW90E2xloVRZclzBsLnSgU0suvy0N2aFfv_BRlBMTHEJ7cqnVMK-z18msaRCmaLCemTQSuiAyqe7hyVzLw_h5Uw6f_Bt8rKQB9gcDfiHiUZICQ16CZeVUZogpQRVA4F6GZiIO77GEkxX9IDDPO4-76pSYcfVKaSIm6LrzgudHz1DCE6Ier1zBB2X4w84btAmZWlfqQM-_yab-HMy7M547iOzYenq85vVaMsLDDSYFND7U6CCVfVxD6lKe_PMXXuNGkb4k7XKc8qlFYTkhD3tHXagFwIeVDYxT8qWZ6-vdnjHuEtcATn77cEl55p9XmcRjELrdFGKP33IQpoPzri7ATLNM8HDx7lbINTpP6vAWmmjg2cvGqtpuSau6xWqjo7tE7qL7imI90Ud3zHFUqgPCe_5-E8ynWud5FOrLrEb6W3YL4y6IFndAFC2fsiV9q6dAi6zzuxLTpZbAydG9r4GvGk_sZNWZuhcFLCLbAnAnPrjBykMoTAByDs88VZ0D7bBjebtAslRREZoJg64QIJ_4IAvg86qeL7LSCZa_-y3CCaxQ5dT-EoZSo_uTGPFiYFVoY4c-DLNcQ2rzE0c3Ix_kBIU0WhCHfmksOrE7EuKIcbH26H4-MXyUNzfbPGKXK91GNQTj-heOcWicbuu9KD0fYTgFbhxQN_kfJ4HdUZC',
    expDateMonth: 11,
    expDateYear: 2020
  });

  it('Should make success post request of send()', async () => {
    mock.post(endpoint, (req, res) => {
      return res.status(201).body(JSON.stringify(successResponse));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await serviceRequest.send();
    expect(spy).toBeCalledWith(data);
  });

  it('Should make success get request of send()', async () => {
    mock.get(endpoint, (req, res) => {
      return res.status(201).body(JSON.stringify(successResponse));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await serviceRequest.send();
    expect(spy).toHaveBeenCalled();
  });

  it('Should make error post request of send()', async () => {
    mock.post(endpoint, {
      body: '{"statusText":"Could not send transaction."}',
      status: 0
    });
    try {
      await serviceRequest.send();
    } catch (err) {
      expect(err).toEqual(errResponse);
    }
  });

  it('Should make error get request of send()', async () => {
    mock.get(endpoint, {
      body: '{"statusText":"Could not send transaction."}',
      status: 0
    });
    try {
      await serviceRequest.send();
    } catch (err) {
      expect(err).toEqual(errResponse);
    }
  });

  it('Should make Error request to call onerror() of send()', async () => {
    mock.error(() => {
      /* do nothing */
    });
    mock.post(endpoint, {
      body: '{"statusText":"Could not send transaction."}',
      status: 0
    });
    try {
      await serviceRequest.send();
    } catch (err) {
      expect(err).toEqual(errResponse);
    }
  });

  afterEach(() => {
    mock.teardown();
  });

  // test('getEndpoint method of Payment Service for endpointUrl-case 1', () => {
  //   const response = serviceRequest.getEndpoint(deviceAPIObj);
  //   expect(response).toEqual(endpointUrl);
  // });

  // describe('', () => {
  //   test('chdForm method of Payment Service for card payment', () => {
  //     const tag = 'data-chd';

  //     let chd = {};
  //     chd = serviceRequest.chdForm(doc, tag);
  //     expect(chd).toEqual(chdFormResponse);
  //   });
  // });
});
