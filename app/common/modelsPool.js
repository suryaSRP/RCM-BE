const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generic = new Schema({});
const clientsdb = require("../clientsdb");
var mongooseDynamic = require ('mongoose-dynamic-schemas');

let modelsPool={};

let getModel= exports.getModel=({clnt_intn_id, collection, schemaObject})=>{
    let connectdbCommon = clientsdb(clnt_intn_id);
    let model = modelsPool[`${clnt_intn_id}_${collection}`];
    let schema=new Schema({}, {
        collection: collection
    });
    if(!model){
        model = modelsPool[`${clnt_intn_id}_${collection}`] = connectdbCommon.model(
            collection,
            updateSchema(schema,schemaObject)
        );
    };
    return model;
};


var updateSchema=exports.updateSchema=(schema, schemaObject)=>{
    schema.add(schemaObject?schemaObject:{});
    return schema;
};

let asyncFunction=async ()=>{
    let model=new getModel({
        clnt_intn_id:"test",
        collection:"test",
        schemaObject:{
            name:{
                type:String,
                required:true
            }
        }
    })({
        name:"shiva",
        lastName:"Shiva"
    });
    
    let response = await model.save();
    console.log("🚀 ~ file: modelsPool.js ~ line 46 ~ response", response);
}
asyncFunction();