// import jest from "jest-mock";
// import mock from "xhr-mock";
// import { ProcessRequest } from "../__mocks__/ProcessRequest";

// const endpoint =
//   "http://wp121dapp020.dc12.digitalriverws.net:9354/api/v1/payments";
// const successResponse = {
//   encResponse:
//     "Bh2ORvQAAAPsDFW4QJmd7dqa4VprPKegflpX2NgoF-K6etcP_xOQaC5J6kYmRIlwqN04q4YhEdYf8z7zNrhc53owL-vQFg0X3kK-9P86zI-q_Aj5AvlVBxO17gaAm8u6NJrooee_u0GqAIO13Ra33oBBxAvuuBMD09WgJ-YnY4KaENjT0xA0msIU1cwsG9tkiHx-1EAMUGnMfH2Db_-dE2yc-lqpponBaSWHM3JtZA30ByJ0H9S4J7vkRgyG-VZK87Vn9OlrgAfm-iQCX0GDwjOdbM0vmIysvDCP1SacMtulu3W7B1cdQMo7jFUR2H-M6RvlkQFsOVQFvRxBSQA27lZz1M8zleagbqh8MeNJIuQXlgxpAwf5fNV-ZbDnzyB9qM-GDfmDY8vM_MkpZ3Sx2lX88b4s0crwoX_4NEjy2A6TPI6be-Yh-D_Np8KipVnl4AAIewTSLKJplPlNnsFkzKJULD3JJN7k_oNGq33JzkZntqVkZn2frZkIIKQMjiQa0H3jL3-WjdkmmG1NdvL6LdbJmZhPcnHjRUdfZwiXKOMTXubFGL1lLxQaN4urzJFZpTRSW2A05gR8O6pkSx6V0A4JjtPOvF1HFJxfHvgmmEXCzuueVDb7BJOvIwtXCwT7hpr0kAiPrXJtEY-Tk8ncj938NiEpBgslq_gPIWQrZdNNXNuNxnZobkl6hTCjZxfwD7PMduyfgaQzi7gcRlcUaqpp-hKWuLSZ_2BqaWrSUtWxzseup7AgEVxsRM5-WwqfYb3cQSaOkN2CGRfEM6k_EOigji3dU-6hcRrUoLgjFE1A9nAQp7doteJn3vZUbkBOJzxZw0pmJUzU64EIKGS-y9gqv8PEJzz-iLFjPas1X0ccvpvHCFtBJuDQwXSU7csDBitk9MvI0Ppq0AuG9NAVBGzMH41AYKLyFFUqt8LhVmUNLmjQZTQLuB1I2IKnVZJiVqiVEuv8CBm9zZkoTxWoOt5JVSUPZnBAEG3hDZOSlMC5iXFhccdop-iypS3tt6vZMWFP2JYtnpuH"
// };
// const errResponse = {
//   statusText: "Could not send transaction"
// };
// const data = JSON.stringify({
//   cardHolderName: "John",
//   cardNumber: "4444333322221111",
//   cvCode: "123",
//   encryptedPayload:
//     "BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJeiiFC97jgpzsWjW-71lLAlyqb2jQh_SWNZzaLqsRqjeSAe6wWaat6y66ljFGEeuqqBczCRIY84V7YXiibunYH6xkhE8SN5wPUB2KNpGSeNI2gZT2n1wvOaMXXsl3ZugpW90E2xloVRZclzBsLnSgU0suvy0N2aFfv_BRlBMTHEJ7cqnVMK-z18msaRCmaLCemTQSuiAyqe7hyVzLw_h5Uw6f_Bt8rKQB9gcDfiHiUZICQ16CZeVUZogpQRVA4F6GZiIO77GEkxX9IDDPO4-76pSYcfVKaSIm6LrzgudHz1DCE6Ier1zBB2X4w84btAmZWlfqQM-_yab-HMy7M547iOzYenq85vVaMsLDDSYFND7U6CCVfVxD6lKe_PMXXuNGkb4k7XKc8qlFYTkhD3tHXagFwIeVDYxT8qWZ6-vdnjHuEtcATn77cEl55p9XmcRjELrdFGKP33IQpoPzri7ATLNM8HDx7lbINTpP6vAWmmjg2cvGqtpuSau6xWqjo7tE7qL7imI90Ud3zHFUqgPCe_5-E8ynWud5FOrLrEb6W3YL4y6IFndAFC2fsiV9q6dAi6zzuxLTpZbAydG9r4GvGk_sZNWZuhcFLCLbAnAnPrjBykMoTAByDs88VZ0D7bBjebtAslRREZoJg64QIJ_4IAvg86qeL7LSCZa_-y3CCaxQ5dT-EoZSo_uTGPFiYFVoY4c-DLNcQ2rzE0c3Ix_kBIU0WhCHfmksOrE7EuKIcbH26H4-MXyUNzfbPGKXK91GNQTj-heOcWicbuu9KD0fYTgFbhxQN_kfJ4HdUZC",
//   expDateMonth: "01",
//   expDateYear: "2020"
// });
// const processRequest = new ProcessRequest();
// processRequest.timeout = 5000;
// const timeout = processRequest.timeout;

// describe("API calling", () => {
//   beforeEach(() => {
//     mock.setup();
//   });

//   it("Should make success post request of sendPayment()", async () => {
//     processRequest.successFn = jest.fn(() => {
//       /* do nothing */
//     });
//     processRequest.errorFn = jest.fn(() => {
//       /* do nothing */
//     });
//     mock.post(endpoint, (req, res) => {
//       return res.status(201).body(JSON.stringify(successResponse));
//     });
//     const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, "send");
//     await processRequest.sendData(endpoint, data, "POST");
//     expect(spy).toBeCalledWith(data);
//   });

//   it("Should make success get request of sendPayment()", async () => {
//     processRequest.successFn = jest.fn(() => {
//       /* do nothing */
//     });
//     processRequest.errorFn = jest.fn(() => {
//       /* do nothing */
//     });
//     mock.get(endpoint, (req, res) => {
//       return res.status(201).body(JSON.stringify(successResponse));
//     });
//     const spy = jest.spyOn((window as any).XMLHttpRequest.prototype, "send");
//     await processRequest.sendData(endpoint, data, "GET");
//     expect(spy).toHaveBeenCalled();
//   });

//   it("Should make error post request of sendPayment()", async () => {
//     processRequest.successFn = jest.fn(() => {
//       /* do nothing */
//     });
//     processRequest.errorFn = jest.fn(() => {
//       /* do nothing */
//     });
//     mock.post(endpoint, (req, res) => {
//       return res.status(405).body(JSON.stringify(errResponse));
//     });
//     await processRequest.sendData(endpoint, data, "POST");
//   });

//   it("Should make error get request of sendData()", async () => {
//     processRequest.successFn = jest.fn(() => {
//       /* do nothing */
//     });
//     processRequest.errorFn = jest.fn(() => {
//       /* do nothing */
//     });
//     mock.get(endpoint, (req, res) => {
//       return res.status(501).body(JSON.stringify(errResponse));
//     });
//     await processRequest.sendData(endpoint, data, "GET");
//   });

//   it("Should make Error request to call onerror() of sendData()", async () => {
//     processRequest.successFn = jest.fn(() => {
//       /* do nothing */
//     });
//     processRequest.errorFn = jest.fn(() => {
//       /* do nothing */
//     });
//     mock.error(() => {
//       /* do nothing */
//     });
//     mock.post(endpoint, (req, res) => {
//       return Promise.reject(new Error("Could not send transaction"));
//     });
//     await processRequest.sendData(endpoint, data, "POST");
//   });

//   it(
//     "Should get timeout and should call ontimeout() of sendData()",
//     async done => {
//       processRequest.successFn = jest.fn(() => {
//         /* do nothing */
//       });
//       processRequest.errorFn = jest.fn(() => {
//         /* do nothing */
//       });
//       mock.get(
//         endpoint,
//         () =>
//           new Promise(() => {
//             /* do nothing */
//           })
//       );
//       await processRequest.sendData(endpoint, data, "GET");
//       setTimeout(() => {
//         done();
//       }, timeout + 1);
//     },
//     timeout + 10
//   );

//   afterEach(() => {
//     mock.teardown();
//   });
// });
