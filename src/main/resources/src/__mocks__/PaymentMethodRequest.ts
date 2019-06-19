import { ProcessRequest } from "./ProcessRequest";
export class PaymentMethodRequest extends ProcessRequest {
  send() {
    return {
      method: "POST",
      endpoint: "/api/v1/paymentmethods",
      paymentMethodType: "ibp",
      encryptedPayload:
        "BgAAA-wdjkb0s1cWn2o2wd5kIwADWrv5_HhL1qObOJZSBC-po-0XPOikaDhl18pBHKNaUzWh5FSe0dlgirdENWUXTzF3L1YkHHSUPWHolpJJ6g8G0psqWpVMuadq63Yp40tjXC_VqUJXzUoupegN9zpGZdsXDCzgz8EpVfA3Hwt-HaFTfuL_sDbO6Lhj7nox1Cwf5nbj_2FeMvjZtLk8mkPpYzoSX4q74kvswM_OdgKWwhCjYiDSZeOysommbVcsrXfLI-wI3tvBQjBsqRfqDrG6hmn2tTER8F1uuEk81dnNRa9L-x9alyYhVdYM-net_wx08ji4813yc74Fo8QMXKyvP7J1VIo5MGFJy_k7icJnPRazYLirj_zvpHLoTM59TPtY4ZVgbhPUWnp1sa5mKfmkTIeXiQKkFN24k-bGKGEWDbuYWMT4JOofCT4l4YjBos8bomBYpcessh0w1NwrDAIVrkMESGPbeFA8bTKzOwLT5oTIB_lYWc0pWAY5Ejl_3wiMyyXjjf3aQ17W6Uwtai-MzcuChNrlxP6aH6QGuvBNnnhffW4bCoHDJjZZ1qlXwSocCbme_mrI-Fyg1bdmBtL5yKuvPdiccej46TH4YzMF84BGt_3pDptODfeyJopEZ_noL7ChOmAnWrecYdkCECmVFcsVN2NbvUEBlN3pPByjFB2XMXNvFHBAI26uDvEl66eJVD_S5T8twScl9rsxS0jHbcprlrg6iSizL6-SaKAgLq6vcBbDca7nLKYvuhYq-mndmTCbOO9NlzezuK4zEaD3RWjcZQwBCbokUZv_C84Fkmow4ILKrdpgWYlUwNuoU7R5ksTyVoh78yvV7VxYC4ySd8L7KLiMmb2OFsGyrRd9_Bpc1vwWK84="
    };
  }
}
