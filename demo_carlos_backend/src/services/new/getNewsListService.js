const { NewModel } = require ("../../models/NewModel")

async function getNewsListService(filter = {}) {
    try {
        return await NewModel.find(filter).sort([['archiveDate', -1], ['date', -1]]).exec();
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getNewsListService}
