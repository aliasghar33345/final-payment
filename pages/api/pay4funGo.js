const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

export default async function handler(req, res) {

  if (req.method === "POST") {
    try {


      const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
      const merchantInvoiceId = uuidv4();
      const merchantSecret = process.env.NEXT_PUBLIC_MERCHANT_SECRET_GO;
      const amount = req.body.amount
      const seed = `${merchantId}${amount}00${merchantInvoiceId}${merchantSecret}`

      if (!amount) {
        return res.status(400).json({ message: "amount is required" })
      }

      //creating hmac object 
      const hmac = crypto.createHmac('sha256', '7638772');
      //passing the data to be hashed
      const seedData = hmac.update(seed);
      //Creating the hmac in the required format
      const gen_hmac = seedData.digest('hex');

      const hash = `${gen_hmac}`;

      const data = JSON.stringify({
        "amount": String(amount),
        "merchantInvoiceId": merchantInvoiceId,
        "language": "pt-BR",
        "currency": "BRL",
        "okUrl": process.env.NEXT_PUBLIC_OK_URL,
        "notOkUrl": process.env.NEXT_PUBLIC_NOT_OK_URL,
        "confirmationUrl": process.env.NEXT_PUBLIC_CONFORMATION_URL,
        "merchantLogo": process.env.NEXT_PUBLIC_MERCHANT_LOGO
      });

      const config = {
        method: 'POST',
        url: 'http://apitest.p4f.com/1.0/go/process/',
        headers: {
          'merchantId': merchantId,
          'hash': hash,
          'Content-Type': 'application/json'
        },
        data
      };

      const { data: response } = await axios(config);

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json(error?.response?.data)
    }
  }

}