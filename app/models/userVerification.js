const mongoose = require("mongoose");

var userVerification = {
    body: { type: String, },
    numSegments: { type: String, },
    direction: { type: String, },
    from: { type: String, },
    to: { type: String, },
    dateUpdated: { type: Date, },
    price: { type: String, },
    errorMessage: { type: String, },
    uri: { type: String, },
    accountSid: { type: String, },
    numMedia: { type: String, },
    status: { type: String, },
    messagingServiceSid: { type: String, },
    sid: { type: String, },
    dateSent: { type: String, },
    dateCreated: { type: String, },
    errorCode: { type: String, },
    priceUnit: { type: String, },
    apiVersion: { type: String, },
    ee_id: { type: String, },
    OTP: { type: Number, }

}

module.exports = userVerification;
