jest.mock('../worldline-payments-alternate.request');
import { AlternatePaymentRequest } from '../worldline-payments-alternate.request' ;
const { send } =require('../worldline-payments-alternate.request') ;
//const { AlternatePaymentRequest } = require('../worldline-payments-alternate.request');

// test('should print the status', () => {
//  const altpaymentRequest = new AlternatePaymentRequest();
//  altpaymentRequest.method="POST";
//  altpaymentRequest.paymentMethodId="2030";
//  altpaymentRequest.encryptedPayload="BgAAA-wdjkb0KBF9_yhvweTHFvTAuF3U85t7wxX2kJjdhz20LnXdPtYHnqo2vF4CDt4JfqoQ_rIq6dF6gucFE_HUYnE4K0Lp5VIgl-7qS8ptdaILPDVxl_DPH1ENA9sWORJz0cxOuwzLNMCaRbGOJgDV0RNcccSXWYbw2gb8x3poDP2cf0HQlEGNF31gWCkVCrjcxMUxFnc6U7znq7DTchoTS6RhOXTFPe0ygH6Tqp-QFJweFyeOZmdk5q3K-pUdZBm5WqIQjAYj6n22qxLxSB4vrOEmyJFDgZFfi5j7mS8YfIJHzIyofjM3UNIGOYLR5dnGUogrPEG-4W829jk8U7kov5SoRQZxvZV3x3ZrBjJm87y-dTDa7mp1bYo5mMcsKG0y9SNhSYCeLZBNIbDcl79tDbAjb54z236G6jxjd_SFSjhi3ie2HjG4qvYlsQHYR6A_Ct2knm8FYhNug2s1V1COSe3re1nXyEEW7MIG5Bb1lizjf_pDw-9vJIb_7VZJiyrFwAPPRbhUnVDWu9gZScWv-gzRtUUDuE5sIcPavFfywoQnYYAid-Dl42PsHK5Scj2_1WFo_GuM5pYI-5yO6iX5MxFsDI_hawiAMZPH342DlSnlTOrk-DbetFOT08E_pETYCqrPWW2J_TLdBXaZgprxP9vtsU3zRjEZSywywIf5elvGVaWIuUx4NSCA7jOMgk9z2fw7lOItoN_YOJYMCWxCPCnamzQ-c1-72vwmKxAg4HLjQYKOSoU2xSfMs-0EyhTQ3zDFwl7muRFW3xL3vTLDesSlvbFSNpPGUWdSonv8sICNIaUTLm3ah7YJMT_fHpjT4G8RrHx15idG2-aQolQazzFORnt9zwDKDwwXQxjAmGBfeidHqaZoM8gUNEH2PIZOCOoWNecN";
//  altpaymentRequest.endpoint="http://wp121dapp020.dc12.digitalriverws.net:9354";
//  var paymentMethodType="eft";
// var endpointUrl=altpaymentRequest.endpoint;
// var data = JSON.stringify({
//   paymentMethodId:this.paymentMethodId,
//   encryptedPayload:this.encryptedPayload
// });
// var response=altpaymentRequest.send("eft");
// console.log(response);
// expect(response.paymentMethodId).toEqual("2030");


//var rs=altpaymentRequest.sendPayment(endpointUrl,data,altpaymentRequest.method);
  // altpaymentRequest.send("eft").then(status => {
  //   expect(status).toBe(201);
  // });
//});


test('Should print the response of send',()=>{
  const altpaymentRequest = new AlternatePaymentRequest();
  altpaymentRequest.method="POST";
  altpaymentRequest.paymentMethodId="2030";
  altpaymentRequest.encryptedPayload="BgAAA-wdjkb0KBF9_yhvweTHFvTAuF3U85t7wxX2kJjdhz20LnXdPtYHnqo2vF4CDt4JfqoQ_rIq6dF6gucFE_HUYnE4K0Lp5VIgl-7qS8ptdaILPDVxl_DPH1ENA9sWORJz0cxOuwzLNMCaRbGOJgDV0RNcccSXWYbw2gb8x3poDP2cf0HQlEGNF31gWCkVCrjcxMUxFnc6U7znq7DTchoTS6RhOXTFPe0ygH6Tqp-QFJweFyeOZmdk5q3K-pUdZBm5WqIQjAYj6n22qxLxSB4vrOEmyJFDgZFfi5j7mS8YfIJHzIyofjM3UNIGOYLR5dnGUogrPEG-4W829jk8U7kov5SoRQZxvZV3x3ZrBjJm87y-dTDa7mp1bYo5mMcsKG0y9SNhSYCeLZBNIbDcl79tDbAjb54z236G6jxjd_SFSjhi3ie2HjG4qvYlsQHYR6A_Ct2knm8FYhNug2s1V1COSe3re1nXyEEW7MIG5Bb1lizjf_pDw-9vJIb_7VZJiyrFwAPPRbhUnVDWu9gZScWv-gzRtUUDuE5sIcPavFfywoQnYYAid-Dl42PsHK5Scj2_1WFo_GuM5pYI-5yO6iX5MxFsDI_hawiAMZPH342DlSnlTOrk-DbetFOT08E_pETYCqrPWW2J_TLdBXaZgprxP9vtsU3zRjEZSywywIf5elvGVaWIuUx4NSCA7jOMgk9z2fw7lOItoN_YOJYMCWxCPCnamzQ-c1-72vwmKxAg4HLjQYKOSoU2xSfMs-0EyhTQ3zDFwl7muRFW3xL3vTLDesSlvbFSNpPGUWdSonv8sICNIaUTLm3ah7YJMT_fHpjT4G8RrHx15idG2-aQolQazzFORnt9zwDKDwwXQxjAmGBfeidHqaZoM8gUNEH2PIZOCOoWNecN";
  altpaymentRequest.endpoint="http://wp121dapp020.dc12.digitalriverws.net:9354";
  var paymentMethodType="eft";
  expect(altpaymentRequest.send(paymentMethodType)).toEqual({
    paymentMethodId:"2030",
    method:"POST",
    endpoint:"http://wp121dapp020.dc12.digitalriverws.net:9354",
   // encryptedPayload:"BgAAA-wdjkb0PmcdpncV243xyGonU6IL3GLSXdReVAuyDNjDQxFOZTlVO0sKx2kC4xRweU8dht46a0WZVqdEG_uYwt_S3frGpULc9vG06IWpKehuNbVUCAzHdNIjT3LisdDBQHJc2WYbkokMXB_vTLMUxIGXpiuc37_pQemsiixm9E_q2IdLv3924qKJ-ss9_-qKnl7wyowoVhfCQKkQlAfX4PhjTxaTl1JAMvJk56AK1OGWenQ79GZhar0X7fywK_Z-LStRTyMbA3W-Gw5jLIKYahjzklxzxZr4ZXbHvvpm_rj_fyoPZpomf1iNmbNseRhzAduPy-TORNK4cALmAgCIaYRLTLyNPqPNvGHoorCYygwIZgFNXqAlp8j_RrPYLqNxyERmM5tterOsrevDZ3DeH5BnFsOe2nxL12PsCGhmQJIQ8BbJkx4rgKs2LVIl9yLZRy8nhYkgpwwiV1IPhjOB7E-f6saCNNoKmENxn7z5Evrey5vosWyqdyO0VQstFleZtVrLy3UfX_N5vYNon6hj8wjxb1iD6jzSMSoDaJgUy_IYait-ORsaQgmoWgsSoM8Q6ZJF4pDHZsrtWICDl3vlMqdTlYVpjpFR-OYCkDHe8_uOP-0thXZULcIxlYXIbt3ykML0JP5VNRbeBzaGCD0yyZHRBPgJ5LD3DNhCXJ7yc6meecYSiOwpegVQM4QGqhiwPClndto_m3_dUsv6FBpYE8HMKVBnnZo6EV7XBUwkMr89AFXylLb9hL_lG-9aIBjHfpPjhZxR8KCozwbrJefKAp9N4dgYecuK9W-0mD4F1KuPOwf3jYLv8O8BACWgbDGE9KxiTzTUzSI21MwAYlGRljAOZUzvMUd85Eb66Tpx8iy_td4xIdR3ZruQbPqjqWnEpK1ztiI3"
  })
});



