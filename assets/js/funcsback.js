const nodemailer = require("nodemailer");
const path = require("path");

class Funcs {
    constructor() {}

    sendmail(the_mail_address,mail_address, subject, message) {
        // You should enter your mail informations the "transfer" object below. 
        // This settings are for gmail , please update them if you use another mail service.
        // Also this informations for sender mail which is sending mails from contact page to your original mail address
        // You can use your original mail address too , does not matter.
        // But you should make security low for sender mail address , please take a look : https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
        var transfer = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {//for sender
                user: "",
                pass: ""
            }
        });

        var mail_info = {
            from: mail_address,
            to: the_mail_address,
            subject: subject + " - from:" + mail_address,
            text: message,
        };

        transfer.sendMail(mail_info, function(error) {
            if (error) throw error;
        });
    
    }

    checkFileType(file, cb) {
        // Allowed ext
        const filetypes = /jpeg|jpg|png|svg|ico/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
    
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}

module.exports = Funcs;