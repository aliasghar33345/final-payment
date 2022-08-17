
// export default function handler(req, res) {
//     if (req.method === "POST") {
//         res.status(200).json({ message: 'Payment done' })
//     } else {
//         res.status(404).json({ error: 'Error 404: Route Not Found' })

import { database } from "../../config";

//     }
//   
// }


const chargePost = async (payload) => {
    const response = await fetch('https://api.openpix.com.br/api/openpix/v1/charge', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: process.env.NEXT_PUBLIC_APP_ID,
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    const data = await response.json();

    console.log({
        data,
    });



    return data;
}

export default async function handler(req, res) {

    if (req.method === "POST") {
        const { body } = req;
        console.log(body)
        const donation = {
            _id: Date.now()
        }

        const payload = {
            correlationID: donation._id.toString(),
            value: body.value,
            // comment: body.comment,
        }
        const data = await chargePost(payload);

        database.query(`INSERT INTO Payments (customer,
            chargeValue,
            identifier,
            transactionID,
            status,
            giftbackAppliedValue,
            discount,
            valueWithDiscount,
            createdAt,
            paymentLinkID,
            updatedAt,
            pixKey,
            paymentLinkUrl,
            qrCodeImage,
            globalID,
            correlationID,
            brCode) VALUES (
                '${data.charge.customer}',
                ${data.charge.value},
                '${data.charge.identifier}',
                '${data.charge.transactionID}',
                '${data.charge.status}',
                ${data.charge.giftbackAppliedValue},
                ${data.charge.discount},
                ${data.charge.valueWithDiscount},
                '${data.charge.createdAt}',
                '${data.charge.paymentLinkID}',
                '${data.charge.updatedAt}',
                '${data.charge.pixKey}',
                '${data.charge.paymentLinkUrl}',
                '${data.charge.qrCodeImage}',
                '${data.charge.globalID}',
                '${data.charge.correlationID}',
                '${data.charge.brCode}'
            )`)

        // console.log(data1)
        // const brCode= 1234123
        // const error = false
        if (data.error) {
            res.status(400).json({
                error: data.error,
            })
            return;
        }

        // await Donation.updateOne({
        //   _id: donation._id,
        // }, {
        //   $set: {
        //     brCode,
        //   },
        // });

        const body1 = {
            comment: donation.comment,
            value: donation.value,
            id: donation._id.toString(),
            status: donation.status,
            ...data,
        };
        res.status(200).json(body1);
    } else {
        res.status(404).json({ error: 'Error 404: Route Not Found' })
    }
}

