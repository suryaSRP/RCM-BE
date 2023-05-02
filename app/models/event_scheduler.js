var event_scheduler = {
    clientName: { type: String, },
    clnt_intn_id: { type: String, },
    scheduledDate: { type: Date, },
    clientMobileNo: { type: Number, },
    assignTo: { type: String, },
    data_stat_cd: { type: String, },
    efcv_bgdt: { type: String, required: true, },
    efcv_endt: { type: Date, },
    status: { type: String, },
    address: { type: String },
    clientPincode: { type: Number, },
    comments: { type: String, },
    otpGenerated: { type: Boolean },
    row_ts: { type: Date, },
}
module.exports = event_scheduler;