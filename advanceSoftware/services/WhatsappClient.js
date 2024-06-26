const { Client } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
//import { Client } from "whatsapp-web.js";
//import qrcode from "qrcode-terminal";
const whatsappclient = new Client()

whatsappclient.on("qr", (qr) => qrcode.generate(qr, { small: true }))
whatsappclient.on("ready", () => console.log("Client is ready!"))

whatsappclient.on("message", async (msg) => {
    try {
        if (process.env.PROCCESS_MESSAGE_FROM_CLIENT && msg.from != "status@broadcast") {
            const contact = await msg.getContact()
            console.log(contact, msg.from)
        }
    } catch (error) {
        console.error(error)
    }
})
//export default  whatsappclient
module.exports = whatsappclient