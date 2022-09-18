const { NewModel } = require ("../../models/NewModel")

async function addNewService({title, description, author, content, date}) {
    try {
        const newModelObject = new NewModel({title, description, author, content, date})
        return await newModelObject.save().then((data) => {return data});
    } catch (error) {
        console.error(error)
    }
}

module.exports = {addNewService}
