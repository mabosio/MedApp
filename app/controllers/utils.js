const Encounter = require('../models/encounter.js');
const Careplan = require('../models/careplan.js');
const Inmunization = require('../models/inmunization.js');
const Medication = require('../models/medication.js');
module.exports = {
        setObVal: function ( resultObj, inputObj) {
        for (let key in inputObj) {
            if (inputObj.hasOwnProperty(key)) {
                let item = inputObj[key];
                if (item)
                    resultObj[key] = item;

            }
        }
    }
    ,
        delRelatedDoc: async function (v, arrCond,res){
            console.log(arrCond);
            try {
                if (v === "inmunizations") await Inmunization.remove( {_id: { $in: arrCond } });
                  else
                      if (v === "medications") await Medication.remove( {_id: { $in: arrCond } });
                        else if (v === "encounters")  await Encounter.remove( {_id: { $in: arrCond } });
                          else  await Careplan.remove( {_id: { $in: arrCond } });
               }
            catch (err) {
                res.status(500).send({
                    message: "Error deleting data"+ err
                });
            }


        }

        ,
        setObValSp: function  ( resultObj, inputObj,arrKey) {
             for (let key in inputObj) {
                if (inputObj.hasOwnProperty(key)) {
                    if (key===arrKey) {
                        let spkey = inputObj[arrKey];
                        spkey.forEach(function (al) {
                              resultObj[arrKey].push(al);
                        });
                    }
                    else {
                        let item = inputObj[key];
                         if (item)
                            resultObj[key] = item;
                    }



                }
            }

        }
    };