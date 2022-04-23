module.exports = {
    secret: "customsecrete",
    passphare: "83ABCB94B3FC6",
    clientdb: "127.0.0.1:27017/",
    appBaseUrl: "http://127.0.0.1/WSEDM/api/",
    basenodeapiURL: "http://127.0.0.1/WSEDM/",
    nodeapiURL: "http://127.0.0.1/WSEDM/api/",
    nodeapiTSURL: "http://127.0.0.1/WSEDM/api/v1.0/",
    coreHrApi: "http://localhost/WSEDM/api",
    reminderApi: "http://127.0.0.1:51509/reminder/api/v1.0",
    eventqueueURL: "http://10.10.30.11:5000/messages/queue-chr",
    lettersURL: "http://127.0.0.1:5000/lm/api/v2.0/",
    externalapi: {
        attendance: "https://ehrms1.excelityglobal.com/",
    },
    // 'dbuser': {
    //     config: {
    //         autoIndex: false
    //     },
    //     user: process.env.dbuser || "dbAdmin",
    //     pass: process.env.dbpass || "password",
    //     useMongoClient: true
    // },
    edmurl: "https://hcmuat.excelityglobal.com/HCM/",
    ssoSAMLLoginURL: "http://localhost:8000/HCM/#/home?sso=0&auth=",
    ssoSAMLerrorURL: "http://localhost:8000/HCM/errorpage.html",
    ftperrpath: "/root/CoreHr/Errorfiles/",
    CDS: {
        url: "http://127.0.0.1:3004/CDS/",
    },
    reports: {
        lmsApi: "http://localhost:51500/lms/api/v1.0",
        apiEMS: "http://127.0.0.1:51507/EMS/api/v1.0",
        tnaApi: "http://localhost:51500/tna/api/v1.0",
        RMS: "http://localhost:3000/RMS",
        EXPENSE: "http://127.0.0.1:51516/EXPENSE/api/v1.0/",
    },
    email: {
        // ======================QA cnfig start

        service: "excelityglobal.com",
        host: "10.204.135.82",
        secure: false,
        port: 25,
        tls: {
            rejectUnauthorized: false,
        },
        debug: true,

        // ======================QA cnfig END
    },
    sessionmanage: {
        sessionExp: "50m",
    },
    ftp: {
        host: "10.204.135.137",
        port: "22",
        username: "root",
        password: "cmc1234",
    },

    paths: {
        base: "/root/CoreHr/",
        policy: "/policy",
        education: "education",
        skill: "skill",
        experience: "experience",
        personal: "personal",
    },
    edupaths: {
        base: "/root/CoreHr/",
        edu: "/education",
    },
    skills: {
        base: "/root/CoreHr/",
        skl: "/skill",
    },
    experience: {
        base: "/root/CoreHr/",
        exp: "/experience",
    },
    personal: {
        base: "/root/CoreHr/",
        person: "/personal",
    },
    empperson: {
        base: "/root/CoreHr/",
        emp: "/empperson",
    },
    emcaddress: {
        base: "/root/CoreHr/",
        address: "/address",
    },
    emcsingle: {
        base: "/root/CoreHr/",
        single: "/single",
    },
    emcreimbursement: {
        base: "/root/CoreHr/",
        reimbursment: "/reimbursment",
    },
    emcsal: {
        base: "/root/CoreHr/",
        salary: "/salary",
    },
    getQualifiedDBUrl: function(clientID) {
        return this.dbuser ?
            "mongodb://" +
            this.dbuser.user +
            ":" +
            this.dbuser.pass +
            "@" +
            this.clientdb +
            clientID +
            "?authSource=admin" :
            "mongodb://" + this.clientdb + clientID;
    },
    getQualifiedDBUrlNoClient: function() {
        console.log(
            this.dbuser ?
            "mongodb://" +
            this.dbuser.user +
            ":" +
            this.dbuser.pass +
            "@" +
            this.clientdb +
            "?authSource=admin" :
            "mongodb://" + this.clientdb + "?authSource=admin"
        );
        return this.dbuser ?
            "mongodb://" +
            this.dbuser.user +
            ":" +
            this.dbuser.pass +
            "@" +
            this.clientdb +
            "?authSource=admin" :
            "mongodb://" + this.clientdb + "?authSource=admin";
    },
    auditFilePath: "./audit.log",
};