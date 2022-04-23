"use strict";
exports.__esModule = true;
exports.nonEmployeeProjection = exports.project = void 0;
exports.project = {};
exports.nonEmployeeProjection = {
    _id: 0,
    first_time_log: 1,
    // efcv_endt:{ $dateToString: { format: "%d-%m-%Y", date: "$efcv_endt" } },
    // efcv_bgdt:{ $dateToString: { format: "%d-%m-%Y", date: "$efcv_bgdt" } },
    usr_name: 1,
    row_ts: 1,
    row_stat_cd: 1,
    wrk_email: 1,
    designation: 1,
    dob: { $dateToString: { format: "%d-%m-%Y", date: "$dob" } },
    doj: { $dateToString: { format: "%d-%m-%Y", date: "$doj" } },
    ph_no: 1,
    role_cd: 1,
    usrid_tx: 1,
    company: 1
    // data_owner:1
};
