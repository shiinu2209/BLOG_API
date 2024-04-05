const nodemailer=require("nodemailer");
const sendEmail=async({emailTo,subject,code,content})=>{
    const transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alayna.fisher@ethereal.email',
        pass: 'btBU6RmP9CMNQsYqJM'
    }
});


  // send mail with defined transport object
  const info = await transporter.sendMail({
    to: emailTo, // list of receivers
    subject, // Subject line
    html:`<div>
        <h3>use bellow code to ${content}</h3>
        <p><strong> code: </strong>${code}</p>
        </div>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


module.exports=sendEmail;