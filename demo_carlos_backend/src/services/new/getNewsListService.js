const { NewModel } = require ("../../models/NewModel")

async function getNewsListService(filter = {}) {
    try {
        return await NewModel.find(filter).exec();
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getNewsListService}
