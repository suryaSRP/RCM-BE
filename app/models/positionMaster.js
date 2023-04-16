var positionMaster = {
    "pstn_id": { type: String, },
    "efcv_bgdt": { type: Date, },
    "efcv_endt": { type: Date, },
    "data_owner": { type: String, },
    "data_stat_cd": { type: String, },
    "parn_pstn_id": { type: String, default: "" },
    "old_parn_pstn_id": { type: String, default: "" },
    "pstn_titl_tx": { type: String, },
    "job_id": { type: Number, default: 0 },
    "shft_cd": { type: String, default: "" },
    "ov_gl_cd": { type: String, default: "" },
    "gl_cost_cd": { type: String, default: "" },
    "stnd_hh_qy": { type: Number, },
    "ov_co_id": { type: String, default: "" },
    "pstn_rsn_cd": { type: String, },
    "phys_loc_id": { type: String, },
    "org_unit_id": { type: String, },
    "fltm_prtm_cd": { type: String, },
    "pstn_ds": { type: String, },
    "fltr_cd": { type: String, },
    "row_ts": { type: Date, },
    "clnt_intn_id": { type: String, },
    "workgroup": { type: Array, },
    "isVacant": { type: Boolean, default: false },
    "manager_name": {
        id: { type: String }, name: { type: String }
    }
}
module.exports = positionMaster