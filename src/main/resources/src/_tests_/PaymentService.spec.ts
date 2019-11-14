import mock from 'xhr-mock';
import { chdFormRequest, doc, ibpDoc, paymentFormRequest } from '../__mocks__/MockResponseConstants';
import { PaymentService } from '../PaymentService';

const errResponse = {
  status: 0,
  statusText: 'Could not send transaction.'
};

const baseUrl = 'http://localhost:9354';
const completeUrl = part => baseUrl + part;

const deviceAPIObj = {
  deviceEndpoint: completeUrl('/api/v1/initauthentication'),
  encryptedPayload: 'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe'
};

let serviceRequest: PaymentService;
describe('PaymentService', () => {
  beforeEach(() => {
    serviceRequest = new PaymentService(deviceAPIObj);
    mock.setup();
  });

  afterEach(() => {
    mock.teardown();
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

  it('calls chdForm and sets card attributes', async () => {
    const tag = 'data-chd';
    mock.post(completeUrl('/api/v1/payments'), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify({}));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await serviceRequest
      .cardPayment()
      .chdForm(doc, tag)
      .send();
    expect(spy).toBeCalledWith(JSON.stringify(chdFormRequest));
  });

  it('calls card and sets card attributes as cardHolderName, cardNumber, cardCVC, cardExpiryMonth, cardExpiryYear', async () => {
    mock.post(completeUrl('/api/v1/payments'), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify({}));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    const cardObj = {
      cardCVC: chdFormRequest.cvCode,
      cardExpiryMonth: chdFormRequest.expDateMonth,
      cardExpiryYear: chdFormRequest.expDateYear,
      cardHolderName: chdFormRequest.cardHolderName,
      cardNumber: chdFormRequest.cardNumber
    };

    await serviceRequest
      .cardPayment()
      .card(cardObj)
      .send();
    expect(spy).toBeCalledWith(JSON.stringify(chdFormRequest));
    expect(serviceRequest['cardHolderName']).toEqual(chdFormRequest.cardHolderName);
    expect(serviceRequest['cardNumber']).toEqual(chdFormRequest.cardNumber);
    expect(serviceRequest['cvCode']).toEqual(chdFormRequest.cvCode);
    expect(serviceRequest['expDateMonth']).toEqual(chdFormRequest.expDateMonth);
    expect(serviceRequest['expDateYear']).toEqual(chdFormRequest.expDateYear);
  });

  it('calls card and sets card attributes as cardHolderName, cardNumber, cvCode, expDateMonth, expDateYear', async () => {
    mock.post(completeUrl('/api/v1/payments'), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify({}));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    const cardObj = {
      cardHolderName: chdFormRequest.cardHolderName,
      cardNumber: chdFormRequest.cardNumber,
      cvCode: chdFormRequest.cvCode,
      expDateMonth: chdFormRequest.expDateMonth,
      expDateYear: chdFormRequest.expDateYear
    };
    await serviceRequest
      .cardPayment()
      .card(cardObj)
      .send();
    expect(spy).toBeCalledWith(JSON.stringify(chdFormRequest));
    expect(serviceRequest['cardHolderName']).toEqual(chdFormRequest.cardHolderName);
    expect(serviceRequest['cardNumber']).toEqual(chdFormRequest.cardNumber);
    expect(serviceRequest['cvCode']).toEqual(chdFormRequest.cvCode);
    expect(serviceRequest['expDateMonth']).toEqual(chdFormRequest.expDateMonth);
    expect(serviceRequest['expDateYear']).toEqual(chdFormRequest.expDateYear);
  });

  it('calls getEndpoint method from the constructor of PaymentService class', () => {
    serviceRequest = new PaymentService({
      deviceEndpoint: completeUrl('/api/v1/payments'),
      encryptedPayload: 'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe'
    });
    expect(serviceRequest['endpoint']).toEqual(baseUrl);
  });

  it('calls initAuth', () => {
    serviceRequest.initAuth();
    testApi(serviceRequest, '/api/v1/initauthentication');
  });

  it('calls continueAuth', () => {
    serviceRequest.continueAuth();
    testApi(serviceRequest, '/api/v1/continueauthentication');
  });

  it('calls cardPayment', () => {
    serviceRequest.cardPayment();
    testApi(serviceRequest, '/api/v1/payments');
  });

  it('calls eftPayment', () => {
    serviceRequest.eftPayment();
    testApi(serviceRequest, '/api/v1/eftpaymentss');
  });

  it('calls redirectPayment', () => {
    serviceRequest.redirectPayment();
    testApi(serviceRequest, '/api/v1/redirectpayments');
  });

  it('calls getEWalletPaymentMethods', () => {
    serviceRequest.getEWalletPaymentMethods();
    testApi(serviceRequest, '/api/v1/paymentmethods');
  });

  it('calls getIbpPaymentMethods', () => {
    serviceRequest.getIbpPaymentMethods();
    testApi(serviceRequest, '/api/v1/paymentmethods');
  });

  it('calls getEftPaymentMethods', () => {
    serviceRequest.getEftPaymentMethods();
    testApi(serviceRequest, '/api/v1/paymentmethods');
  });

  it('calls setWorldlineSessionData', async () => {
    const tag = 'data-chd';
    mock.post(completeUrl('/api/v1/payments'), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify({}));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    const wlnSessionData = 'AXrQC9NS_euIzh6xkJgTiQe9iinHb-2LGhh8CqPKf2bRUmavnp-MkAIP4BxdsQWEoEs3cPFEC84JL4ahaZVawOgVrZdzUFo';
    await serviceRequest
      .cardPayment()
      .chdForm(doc, tag)
      .setWorldlineSessionData(wlnSessionData)
      .send();
    expect(spy).toBeCalledWith(JSON.stringify({ ...chdFormRequest, worldlineSessionData: wlnSessionData }));
  });

  it('calls paymentForm', async () => {
    const tag = 'data-ibp';
    mock.post(completeUrl('/api/v1/redirectpayments'), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201).body(JSON.stringify({}));
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await serviceRequest
      .redirectPayment()
      .paymentForm(ibpDoc, tag)
      .send();
    expect(spy).toBeCalledWith(JSON.stringify(paymentFormRequest));
  });

  it('calls setRequestTimeout', () => {
    serviceRequest.setRequestTimeout(5000);
    expect(serviceRequest['timeout']).toEqual(5000);
  });

  it('calls setRequestTimeout fallback to default', () => {
    serviceRequest.setRequestTimeout(1000);
    expect(serviceRequest['timeout']).toEqual(60000);
  });

  const testApi = async (svc: PaymentService, path: string) => {
    mock.post(completeUrl(path), (req, res) => {
      expect(req.header('content-type')).toEqual('application/json');
      expect(req.header('x-js-sdk-version')).toEqual('worldlinejs-1.1.0');
      return res.status(201);
    });
    const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, 'send');
    await svc.send();
    expect(spy).toBeCalledWith(JSON.stringify({ encryptedPayload: deviceAPIObj.encryptedPayload }));
  };
});
