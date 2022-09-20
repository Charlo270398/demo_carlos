const { addNewService } = require("../../services/new/addNewService");
const { CheckListType } = require("../../utils/CheckType")

async function AddNew({title, description, author, content, date = Date.now()}) {
    try {
        //Check New Values
        await CheckListType([
            {fieldValue: title, fieldName: 'title', type: 'string', checkNotUndefined: true },
            {fieldValue: description, fieldName: 'description', type: 'string', checkNotUndefined: true },
            {fieldValue: author, fieldName: 'author', type: 'string', checkNotUndefined: true },
            {fieldValue: content, fieldName: 'content', type: 'string', checkNotUndefined: true },
            {fieldValue: date, fieldName: 'date', type: 'number', checkNotUndefined: true }
        ])

        const addedNew = await addNewService({title, description, author, content, date});
        return {codeResult: addedNew !== null ? 200 : 400, addedNew: addedNew }
    } catch (error) {
        console.error(error)
        return {codeResult: 400, addedNew: null}
    }
}

module.exports = {AddNew}

