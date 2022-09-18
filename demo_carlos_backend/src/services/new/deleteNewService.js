const { default: mongoose } = require("mongoose");
const { NewModel } = require ("../../models/NewModel")

async function deleteNewService(_id) {
    try {
        //Delete new ONLY if has archiveDate ($and: [{archiveDate: {$exists: true}}, {archiveDate: {$nin: null}}])
        return await NewModel.deleteOne({_id: mongoose.Types.ObjectId(_id), $and: [{archiveDate: {$exists: true}}, {archiveDate: {$nin: null}}]}).exec();
    } catch (error) {
        console.error(error)
    }
}

module.exports = {deleteNewService}
