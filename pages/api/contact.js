
export default async (req, res) => {
    const PASSWORD = process.env.password
    const USER = process.env.user
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: USER,
            pass: PASSWORD
        }
    });

      const mailData = {
        from: 'bets.com.br@hotmail.com',
        to: 'bets.com.br@gmail.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>A new windrow request: ${req.body.name} </br> Requested amount: ${req.body.amount} ${req.body.value}. </br> PIX: ${req.body.pix}</div><p>User email:
        ${req.body.email}</p>`
       }

       try {
            await transporter.sendMail(mailData, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log(info)
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }
        return res.status(200).json({ error: '' });
    console.log(req.body)
  }