const PaymentRequestState = {
  ERROR: 4,
  NEW: 1,
  OK: 3,
  SENT: 2
};
export class PaymentService {
  public method: string;
  private data: any;
  private endpointUrl: string =
    'http://wp121dapp020.dc12.digitalriverws.net:9354/api/v1/payments/';

  public buildRequest() {
    const data = {
      cardHolderName: 'John',
      cardNumber: '4444333322221111',
      cvCode: '123',
      encryptedPayload:
        'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJeiiFC97jgpzsWjW-71lLAlyqb2jQh_SWNZzaLqsRqjeSAe6wWaat6y66ljFGEeuqqBczCRIY84V7YXiibunYH6xkhE8SN5wPUB2KNpGSeNI2gZT2n1wvOaMXXsl3ZugpW90E2xloVRZclzBsLnSgU0suvy0N2aFfv_BRlBMTHEJ7cqnVMK-z18msaRCmaLCemTQSuiAyqe7hyVzLw_h5Uw6f_Bt8rKQB9gcDfiHiUZICQ16CZeVUZogpQRVA4F6GZiIO77GEkxX9IDDPO4-76pSYcfVKaSIm6LrzgudHz1DCE6Ier1zBB2X4w84btAmZWlfqQM-_yab-HMy7M547iOzYenq85vVaMsLDDSYFND7U6CCVfVxD6lKe_PMXXuNGkb4k7XKc8qlFYTkhD3tHXagFwIeVDYxT8qWZ6-vdnjHuEtcATn77cEl55p9XmcRjELrdFGKP33IQpoPzri7ATLNM8HDx7lbINTpP6vAWmmjg2cvGqtpuSau6xWqjo7tE7qL7imI90Ud3zHFUqgPCe_5-E8ynWud5FOrLrEb6W3YL4y6IFndAFC2fsiV9q6dAi6zzuxLTpZbAydG9r4GvGk_sZNWZuhcFLCLbAnAnPrjBykMoTAByDs88VZ0D7bBjebtAslRREZoJg64QIJ_4IAvg86qeL7LSCZa_-y3CCaxQ5dT-EoZSo_uTGPFiYFVoY4c-DLNcQ2rzE0c3Ix_kBIU0WhCHfmksOrE7EuKIcbH26H4-MXyUNzfbPGKXK91GNQTj-heOcWicbuu9KD0fYTgFbhxQN_kfJ4HdUZC',
      expDateMonth: '01',
      expDateYear: '2020'
    };
    return data;
  }

  public send() {
    let state = PaymentRequestState.NEW;
    this.data = this.buildRequest();
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(this.method, this.endpointUrl, true);
      xhttp.timeout = 60000;
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          state = PaymentRequestState.OK;
          resolve(JSON.parse(xhttp.response));
        } else if (xhttp.status === 405) {
          state = PaymentRequestState.ERROR;
          reject({
            status: xhttp.status,
            statusText: 'Please verify the Worldline Device API URL'
          });
        } else {
          state = PaymentRequestState.ERROR;
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      };

      xhttp.onerror = () => {
        state = PaymentRequestState.ERROR;
        reject({
          status: xhttp.status,
          statusText:
            xhttp.statusText === ''
              ? 'Could not send transaction.'
              : xhttp.statusText
        });
      };
      xhttp.ontimeout = () => {
        state = PaymentRequestState.ERROR;
        reject({
          status: xhttp.status,
          statusText: xhttp.statusText
        });
      };

      state = PaymentRequestState.SENT;
      if (this.method === 'POST') {
        xhttp.send(JSON.stringify(this.data));
      } else if (this.method === 'GET') {
        xhttp.send();
      }
    });
  }
}
