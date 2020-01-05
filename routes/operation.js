const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');

const router = express.Router();
const Admin = require("../models/Admin");
var session;

const Funcs = require("../assets/js/funcsback");
const Functions = new Funcs();

router.post("/mail", (req, res) => {
    Functions.sendmail(req.body.the_mail_address,req.body.mail_address, req.body.subject, req.body.message);
    return res.redirect("/contact");
})

router.post("/admin", async (req, res) => {
    var newrecord;
    await bcrypt.genSalt(10, async(err,salt) => {
        if(err) throw err;
        await bcrypt.hash("123",salt, (err,hash) => {
            if(err) throw err;
            newrecord = new Admin({        
            username: "admin",
            password: hash
            })
            newrecord.save((err) => {
                if(err) throw err;
            })
        })
    })
})

router.post("/login", async(req, res) => {
    let control = false;
    let temp_req_ression, temp_req_body_username;
    await Admin.find(async(err, docs) => {
        if (err) throw err;
        for (let data of docs) {
            if(await bcrypt.compare(req.body.password, data.password) && req.body.username == data.username){
                temp_req_ression = req.session;
                temp_req_body_username = req.body.username;
                control = true;
                break;
            }
        }
    })

    if (control === true) {
        session = temp_req_ression;
        session.username = temp_req_body_username;
        return res.redirect("/admin");
    } else return res.redirect("/admin?state=-1");
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        return res.redirect("/admin");
    })
})

router.post("/changepass", (req, res) => {
    Admin.findOne({ username: req.session.username }, async (err, docs) => {
        if(await bcrypt.compare(req.body.current_pass, docs.password)){
            await bcrypt.genSalt(10, async(err,salt) => {
                if(err) throw err;
                await bcrypt.hash(req.body.new_pass,salt, (err,hash) => {
                    if(err) throw err;
                    docs.username = req.body.new_username;
                    docs.password = hash;
                    docs.save((err) => {
                        if(err) throw err;
                        return res.redirect("/admin/change?state=1");
                    })
                })
            })
        }
        else{
            return res.redirect("/admin/change?state=-1"); 
        }
    });
})

router.post("/upload/avatar", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let oldpath = files.filetoupload.path;
        let newpath = `${path.dirname(require.main.filename)}/assets/images/avatar.jpeg`;
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
        });
        return res.redirect("/admin");
    });
})

module.exports = router;