export const chdFormRequest = {
  cardHolderName: 'Mary',
  cardNumber: '4444333322221111',
  cvCode: '123',
  encryptedPayload: 'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe',
  expDateMonth: '12',
  expDateYear: '2020'
};

export const paymentFormRequest = {
  encryptedPayload: 'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe',
  paymentMethodId: '12'
};

export const worldlineSessionDataRequest = {
  encryptedPayload: 'BgAAA-wdjkb0rDBjsl_bx46s0RLrrlv9-N738QWCE0YezPC9cUAJfVmSunJQyP7lrOcnSbb8nJcMIXHYEHwMSz9g2kX3SxCuOpnGJe',
  endpoint: 'http://localhost:9354',
  method: 'POST',
  timeout: 60000,
  version: 'worldlinejs-1.1.0',
  worldlineSessionData: 'AXrQC9NS_euIzh6xkJgTiQe9iinHb-2LGhh8CqPKf2bRUmavnp-MkAIP4BxdsQWEoEs3cPFEC84JL4ahaZVawOgVrZdzUFo'
};

export const ibpDoc = document.implementation.createHTMLDocument('IBP ChildForm Document');
ibpDoc.body.innerHTML = `
<div id="online_banking_details"> 
<select class="form-control" data-ibp="ibpId" id="ibpList" value="12">
<option value="12" selected>12</option>
</select>
</div>
`;
export const doc = document.implementation.createHTMLDocument('ChildForm Document');
doc.body.innerHTML = `
<input
type="text"
class="form-control"
data-chd="cardHolderName"
id="cardHolderName"
placeholder="Card Holder Name"
autocomplete="cc-name"
value="Mary"
/>
<input
type="text"
maxlength="20"
class="form-control"
data-chd="cardNumber"
id="cardNumber"
placeholder="Valid Card Number"
autocomplete="cc-number"
value="4444333322221111"
/>
<input
type="text"
maxlength="4"
class="form-control"
data-chd="cardCVC"
id="cardCVC"
placeholder="CVC"
autocomplete="cc-csc"
value="123"
/>
<select
class="form-control"
data-chd="cardExpiryMonth"
id="cardExpiryMonth"
autocomplete="cc-exp-month"
value="12"
>
<option value="01">01</option>
<option value="02">02</option>
<option value="03">03</option>
<option value="04">04</option>
<option value="05">05</option>
<option value="06">06</option>
<option value="07">07</option>
<option value="08">08</option>
<option value="09">09</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12" selected>12</option>
</select>
<select
class="form-control"
id="expYear"
data-chd="cardExpiryYear"
autocomplete="cc-exp-year"
>
<option value="2019">2019</option>
<option value="2020" selected>2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
</select>
  `;
