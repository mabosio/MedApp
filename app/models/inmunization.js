    const mongoose = require('mongoose');

    const inmunizationSchema = mongoose.Schema({
         inmday:{
            type: Date,
            required: true
        },
        inmname:{
            type: String,
            required: true

        },
        admroute:{
             type: String,
             enum : ['AU','BUC','EPI','IA','IART','ICAR','IDUC','IFOL','IGAS','ILES','IM','IMAM','IMRS','INF','INH','IP','ISIN','ISYN','IT','ITES','IU','IV','IVES','NAS','NG','OU','PAR','PNEU','PO','PV','REC','SC','SCi','SL','TOP','TOPp','TD'],
             default: 'PO'
        },
        dose:{
             type: Number,
             required: true
        },
        units:{
            type: String,
            required: true
        },
        instruction:{
            type: String
        }
    });

    module.exports = mongoose.model('Inmunization', inmunizationSchema);
