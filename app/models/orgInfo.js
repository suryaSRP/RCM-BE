var orgiInfo = {
    actn_ref_id: { type: String, },
    clnt_intn_id: { type: String, },
    cmpny_id: { type: Number, },
    data_owner: { type: String, },
    data_stat_cd: { type: String, },
    efcv_bgdt: { type: String, required: true, },
    efcv_endt: { type: Date, },
    fltr_cd: { type: String, },
    inac_actn_ref_id: { type: String },
    gl_cd: { type: Number, },
    org_unit_id: { type: String, },
    org_titl_tx: { type: String, required: true, },
    org_rsn_cd: { type: String, required: true, },
    org_desc: { type: String },
    parn_org_unit_id: { type: Number, },
    row_ts: { type: Date, },
}
module.exports = orgiInfo;