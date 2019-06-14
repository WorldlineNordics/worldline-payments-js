import { ProcessRequest } from "./ProcessRequest";
export class AlternatePaymentRequest extends ProcessRequest {
  send(paymentMethodType) {
    if (paymentMethodType === "eft") {
      return {
        method: "POST",
        endpoint: "/api/v1/eftpayments",
        paymentMethodId: "2030",
        encryptedPayload:
          "BgAAA-wdjkb0KBF9_yhvweTHFvTAuF3U85t7wxX2kJjdhz20LnXdPtYHnqo2vF4CDt4JfqoQ_rIq6dF6gucFE_HUYnE4K0Lp5VIgl-7qS8ptdaILPDVxl_DPH1ENA9sWORJz0cxOuwzLNMCaRbGOJgDV0RNcccSXWYbw2gb8x3poDP2cf0HQlEGNF31gWCkVCrjcxMUxFnc6U7znq7DTchoTS6RhOXTFPe0ygH6Tqp-QFJweFyeOZmdk5q3K-pUdZBm5WqIQjAYj6n22qxLxSB4vrOEmyJFDgZFfi5j7mS8YfIJHzIyofjM3UNIGOYLR5dnGUogrPEG-4W829jk8U7kov5SoRQZxvZV3x3ZrBjJm87y-dTDa7mp1bYo5mMcsKG0y9SNhSYCeLZBNIbDcl79tDbAjb54z236G6jxjd_SFSjhi3ie2HjG4qvYlsQHYR6A_Ct2knm8FYhNug2s1V1COSe3re1nXyEEW7MIG5Bb1lizjf_pDw-9vJIb_7VZJiyrFwAPPRbhUnVDWu9gZScWv-gzRtUUDuE5sIcPavFfywoQnYYAid-Dl42PsHK5Scj2_1WFo_GuM5pYI-5yO6iX5MxFsDI_hawiAMZPH342DlSnlTOrk-DbetFOT08E_pETYCqrPWW2J_TLdBXaZgprxP9vtsU3zRjEZSywywIf5elvGVaWIuUx4NSCA7jOMgk9z2fw7lOItoN_YOJYMCWxCPCnamzQ-c1-72vwmKxAg4HLjQYKOSoU2xSfMs-0EyhTQ3zDFwl7muRFW3xL3vTLDesSlvbFSNpPGUWdSonv8sICNIaUTLm3ah7YJMT_fHpjT4G8RrHx15idG2-aQolQazzFORnt9zwDKDwwXQxjAmGBfeidHqaZoM8gUNEH2PIZOCOoWNecN"
      };
    } else if (paymentMethodType === "ibp") {
      return {
        method: "POST",
        endpoint: "/api/v1/redirectpayments",
        paymentMethodId: "4",
        encryptedPayload:
          "BgAAA-wdjkb0KBF9_yhvweTHFvTAuF3U85t7wxX2kJjdhz20LnXdPtYHnqo2vF4CDt4JfqoQ_rIq6dF6gucFE_HUYnE4K0Lp5VIgl-7qS8ptdaILPDVxl_DPH1ENA9sWORJz0cxOuwzLNMCaRbGOJgDV0RNcccSXWYbw2gb8x3poDP2cf0HQlEGNF31gWCkVCrjcxMUxFnc6U7znq7DTchoTS6RhOXTFPe0ygH6Tqp-QFJweFyeOZmdk5q3K-pUdZBm5WqIQjAYj6n22qxLxSB4vrOEmyJFDgZFfi5j7mS8YfIJHzIyofjM3UNIGOYLR5dnGUogrPEG-4W829jk8U7kov5SoRQZxvZV3x3ZrBjJm87y-dTDa7mp1bYo5mMcsKG0y9SNhSYCeLZBNIbDcl79tDbAjb54z236G6jxjd_SFSjhi3ie2HjG4qvYlsQHYR6A_Ct2knm8FYhNug2s1V1COSe3re1nXyEEW7MIG5Bb1lizjf_pDw-9vJIb_7VZJiyrFwAPPRbhUnVDWu9gZScWv-gzRtUUDuE5sIcPavFfywoQnYYAid-Dl42PsHK5Scj2_1WFo_GuM5pYI-5yO6iX5MxFsDI_hawiAMZPH342DlSnlTOrk-DbetFOT08E_pETYCqrPWW2J_TLdBXaZgprxP9vtsU3zRjEZSywywIf5elvGVaWIuUx4NSCA7jOMgk9z2fw7lOItoN_YOJYMCWxCPCnamzQ-c1-72vwmKxAg4HLjQYKOSoU2xSfMs-0EyhTQ3zDFwl7muRFW3xL3vTLDesSlvbFSNpPGUWdSonv8sICNIaUTLm3ah7YJMT_fHpjT4G8RrHx15idG2-aQolQazzFORnt9zwDKDwwXQxjAmGBfeidHqaZoM8gUNEH2PIZOCOoWNecN"
      };
    } else if (paymentMethodType === "ewallet") {
      return {
        method: "POST",
        endpoint: "/api/v1/redirectpayments",
        paymentMethodId: "36",
        encryptedPayload:
          "BgAAA-wdjkb0KBF9_yhvweTHFvTAuF3U85t7wxX2kJjdhz20LnXdPtYHnqo2vF4CDt4JfqoQ_rIq6dF6gucFE_HUYnE4K0Lp5VIgl-7qS8ptdaILPDVxl_DPH1ENA9sWORJz0cxOuwzLNMCaRbGOJgDV0RNcccSXWYbw2gb8x3poDP2cf0HQlEGNF31gWCkVCrjcxMUxFnc6U7znq7DTchoTS6RhOXTFPe0ygH6Tqp-QFJweFyeOZmdk5q3K-pUdZBm5WqIQjAYj6n22qxLxSB4vrOEmyJFDgZFfi5j7mS8YfIJHzIyofjM3UNIGOYLR5dnGUogrPEG-4W829jk8U7kov5SoRQZxvZV3x3ZrBjJm87y-dTDa7mp1bYo5mMcsKG0y9SNhSYCeLZBNIbDcl79tDbAjb54z236G6jxjd_SFSjhi3ie2HjG4qvYlsQHYR6A_Ct2knm8FYhNug2s1V1COSe3re1nXyEEW7MIG5Bb1lizjf_pDw-9vJIb_7VZJiyrFwAPPRbhUnVDWu9gZScWv-gzRtUUDuE5sIcPavFfywoQnYYAid-Dl42PsHK5Scj2_1WFo_GuM5pYI-5yO6iX5MxFsDI_hawiAMZPH342DlSnlTOrk-DbetFOT08E_pETYCqrPWW2J_TLdBXaZgprxP9vtsU3zRjEZSywywIf5elvGVaWIuUx4NSCA7jOMgk9z2fw7lOItoN_YOJYMCWxCPCnamzQ-c1-72vwmKxAg4HLjQYKOSoU2xSfMs-0EyhTQ3zDFwl7muRFW3xL3vTLDesSlvbFSNpPGUWdSonv8sICNIaUTLm3ah7YJMT_fHpjT4G8RrHx15idG2-aQolQazzFORnt9zwDKDwwXQxjAmGBfeidHqaZoM8gUNEH2PIZOCOoWNecN"
      };
    }
  }
}
