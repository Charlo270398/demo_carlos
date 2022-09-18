const { default: mongoose } = require("mongoose");
const { NewModel } = require ("../../models/NewModel")

async function archiveNewService(_id) {
    try {
        //$and checks if New object is not archived already
        return await NewModel.updateOne({_id: mongoose.Types.ObjectId(_id), $or: [{archiveDate: {$exists: false}}, {archiveDate: {$eq: null}}]}, {archiveDate: new Date()}).exec();
    } catch (error) {
        console.error(error)
    }
}


module.exports = {archiveNewService}
