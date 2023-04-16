var personinfos = {
    clnt_intn_id: {
      type: String,
    },
    prsn_intn_id: {
      type: Number,
    },
    actn_ref_id: {
      type: String,
    },
    efcv_bgdt: {
      type: Date,
    },
    efcv_endt: {
      type: Date,
    },
    pstn_rsn_cd: {
      type: String,
    },
    pstn_rsn_cd_desc: {
      type: String,
    },
    data_owner: {
      type: String,
    },
    row_stat_cd: {
      type: String,
    },
    rsn_cd: {
      type: String,
    },
    emppic: {
      type: String,
    },
    ctry_cd: {
      type: String,
    },
    rgn_cd: {
      type: String,
    },
    mncp_id: {
      type: String,
    },
    inac_actn_ref_id: {
      type: String,
    },
    prim_lang_cd: {
      type: String,
    },
    org_rsn_cd: {
      type: String,
    },
    sort_frmt_nm: {
      type: String,
      uppercase: true,
    },
    full_frmt_nm: {
      type: String,
      uppercase: true,
    },
    pref_nm: {
      type: String,
    },
    frst_nm: {
      type: String,
      uppercase: true,
    },
    last_nm: {
      type: String,
      uppercase: true,
    },
    mid_nm: {
      type: String,
      uppercase: true,
    },
    Prefered_nm: {
      type: String,
    },
    pfx_nm_cd: {
      type: String,
    },
    ee_id: {
      type: String,
    },
    ph_no: {
      type: String,
    },
    row_ts: {
      type: Date,
      required: true,
    },
    dob: {
      type: Date,
    },
    fthr_nm_tx: {
      type: String,
    },
    empl_star_dt: {
      type: Date,
    },
    grp_empl_star_dt: {
      type: Date,
    },
    cast_tx: {
      type: String,
    },
    ctgry_cd: {
      type: String,
    },
    sour_of_hire: {
      type: String,
    },
    area_intr: {
      type: String,
    },
    mthr_nm_tx: {
      type: String,
    },
    brth_ctry: {
      type: String,
    },
    gdr_cd: {
      type: String,
    },
    sps_nm_tx: {
      type: String,
    },
    brth_rgn_cd: {
      type: String,
    },
    mrtl_stat_cd: {
      type: String,
    },
    co_crnc_cd: {
      type: String,
    },
    nt_cd: {
      type: String,
    },
    con_star_dt: {
      type: Date,
    },
    con_end_dt: {
      type: Date,
    },
    cnfrm_dt: {
      type: Date,
    },
    cnfrm_stat: {
      type: String,
    },
    typ_pror: {
      type: String,
    },
    wrk_days: {
      type: String,
    },
    pay_group: {
      type: String,
    },
    Prefered_nm: {
      type: String,
    },
    reg_temp_cd: {
      type: String,
    },
    prsn_rltn_type_cd: {
      type: String,
    },
    ov_phys_loc_id: {
      type: Number,
    },
    business_ph_no: {
      type: String,
    },
    file_path: {
      type: String,
    },
    title: {
      type: String,
    },
    cmmnt_txt: {
      type: String,
    },
    permanent: [
      {
        efcv_bgdt: {
          type: Date,
        },
        efcv_endt: {
          type: Date,
        },
        data_owner: {
          type: String,
        },
        row_stat_cd: {
          type: String,
        },
        actn_ref_id: {
          type: String,
        },
        clnt_intn_id: {
          type: String,
        },
        prsn_intn_id: {
          type: Number,
        },
        pstl_ad_id: {
          //indicates whether it is present or permanent
          type: Number,
        },
        ad_ln_1_tx: {
          type: String,
        },
        ad_ln_2_tx: {
          type: String,
        },
        ad_ln_3_tx: {
          type: String,
        },
        ctry_cd: {
          type: String,
        },
        rgn_cd: {
          type: String,
        },
        pstl_cd_tx: {
          type: Number,
        },
        mncp_id: {
          type: String,
        },
        ofc_ph_no: {
          type: String,
        },
        res_stat: {
          type: String,
        },
        inac_actn_ref_id: {
          type: String,
        },
        file_path: {
          type: String,
        },
        title: {
          type: String,
        },
        cmmnt_txt: {
          type: String,
        },
        ctry_specific_fields:{}
      },
    ],
    present: [
      {
        efcv_bgdt: {
          type: Date,
        },
        efcv_endt: {
          type: Date,
        },
        data_owner: {
          type: String,
        },
        row_stat_cd: {
          type: String,
        },
        actn_ref_id: {
          type: String,
        },
        clnt_intn_id: {
          type: String,
        },
        prsn_intn_id: {
          type: Number,
        },
        pstl_ad_id: {
          //indicates whether it is present or permanent
          type: Number,
        },
        ad_ln_1_tx: {
          type: String,
        },
        ad_ln_2_tx: {
          type: String,
        },
        ad_ln_3_tx: {
          type: String,
        },
        ctry_cd: {
          type: String,
        },
        rgn_cd: {
          type: String,
        },
        pstl_cd_tx: {
          type: Number,
        },
        mncp_id: {
          type: String,
        },
        ofc_ph_no: {
          type: String,
        },
        res_stat: {
          type: String,
        },
        file_path: {
          type: String,
        },
        checkedVal: {
          type: String,
        },
        inac_actn_ref_id: {
          type: String,
        },
        title: {
          type: String,
        },
        cmmnt_txt: {
          type: String,
        },
        ctry_specific_fields:{}
      },
    ],
    primary: [
      {
        frst_nm: {
          type: String,
        },
        prsn_rltn_type_cd: {
          type: String,
        },
        ph_no: {
          type: String,
        },
        efcv_bgdt: {
          type: Date,
        },
        efcv_endt: {
          type: Date,
        },
        data_owner: {
          type: String,
        },
        row_stat_cd: {
          type: String,
        },
        actn_ref_id: {
          type: String,
        },
        clnt_intn_id: {
          type: String,
        },
        prsn_intn_id: {
          type: Number,
        },
        prps_id: {
          type: Number,
        },
        inac_actn_ref_id: {
          type: String,
        },
        seq_no: {
          type: Number,
        },
      },
    ],
    emergency: [
      {
        frst_nm: {
          type: String,
        },
        prsn_rltn_type_cd: {
          type: String,
        },
        ph_no: {
          type: String,
        },
        efcv_bgdt: {
          type: Date,
        },
        efcv_endt: {
          type: Date,
        },
        data_owner: {
          type: String,
        },
        row_stat_cd: {
          type: String,
        },
        actn_ref_id: {
          type: String,
        },
        clnt_intn_id: {
          type: String,
        },
        prsn_intn_id: {
          type: Number,
        },
        prps_id: {
          type: Number,
        },
        inac_actn_ref_id: {
          type: String,
        },
        ph_no1: {
          type: String,
        },
        seq_no: {
          type: Number,
        },
      },
    ],
    family: [
      {
        family_dob: {
          type: Date,
        },
        family_relation: {
          type: String,
        },
        family_nationality: {
          type: String,
        },
        family_nm: {
          type: String,
        },
        family_emp: {
          type: String,
        },
        family_occup: {
          type: String,
        },
        family_nric: {
          type: String,
        },
        spouse_name: {
          type: String,
        },
        spouse_gndr: {
          type: String,
        },
        spouse_dob: {
          type: Date,
        },
        spouse_ntlty: {
          type: String,
        },
        chld1_name: {
          type: String,
        },
        chld1_dob: {
          type: Date,
        },
        chld2_name: {
          type: String,
        },
        chld2_dob: {
          type: Date,
        },
        chld3_name: {
          type: String,
        },
        chld3_dob: {
          type: Date,
        },
        chld4_name: {
          type: String,
        },
        chld4_dob: {
          type: Date,
        },
        efcv_bgdt: {
          type: Date,
        },
        efcv_endt: {
          type: Date,
        },
        data_owner: {
          type: String,
        },
        row_stat_cd: {
          type: String,
        },
        actn_ref_id: {
          type: String,
        },
        clnt_intn_id: {
          type: String,
        },
        prsn_intn_id: {
          type: Number,
        },
        inac_actn_ref_id: {
          type: String,
        },
        row_ts: {
          type: Date,
          default: new Date(),
        },
        seq_no: {
          type: Number,
        },
        address: {
          type: String,
        },
        status: {
          type: String,
        },
        ctry_specific_fields: { },
      },
    ],
  };
  module.exports = personinfos;
  