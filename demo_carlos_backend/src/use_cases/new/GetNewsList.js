const { getNewsListService } = require("../../services/new/getNewsListService");

async function GetNewsList({isArchivedNews}) {
    try {
        var filter = {};
        //Set isArchived filter
        if(isArchivedNews){
            switch (isArchivedNews) {
                case 'true': {
                    filter.$and = [{archiveDate: {$exists: true}}, {archiveDate: {$nin: null}}]  //Field exists and is not null
                    break;
                }
                case 'false': {
                    filter.$or = [{archiveDate: {$exists: false}}, {archiveDate: {$eq: null}}]  //Field not exists or equals to null
                    break;
                }
                default: {
                    throw Error("Bad request: invalid isArchivedNews query value")
                }
            }
        }
        const newsList = await getNewsListService(filter);
        return {codeResult: 200, newsList: newsList}
    } catch (error) {
        console.error(error)
        return {codeResult: 400, newsList: []}
    }
}

module.exports = {GetNewsList}
