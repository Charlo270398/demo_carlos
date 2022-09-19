const { UserModel } = require("../../models/UserModel");

async function getUserService({username = ''}) {
    try {
        return await UserModel.findOne({username: username}).exec();
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getUserService}
