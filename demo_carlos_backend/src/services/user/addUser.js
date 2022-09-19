const { UserModel } = require ("../../models/UserModel")

async function addUserService({username, password, jwt}) {
    try {
        const newModelObject = new UserModel({username, password, jwt})
        return await newModelObject.save().then((data) => {return {data: data, error: null}}).catch((error) => {return {data: null, error: error}});
    } catch (error) {
        console.error(error)
    }
}

module.exports = {addUserService}
