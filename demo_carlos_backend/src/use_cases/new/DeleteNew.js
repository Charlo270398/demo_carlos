const { deleteNewService } = require("../../services/new/deleteNewService");

async function DeleteNew({_id}) {
    try {
        //Check _id param (not undefined and alphanumeric value)
        if(_id !== undefined && RegExp(/^[a-z0-9]+$/i).test(_id)){
            const deletedNew = await deleteNewService(_id);
            return {codeResult: deletedNew.deletedCount === 1 ? 200 : 400}
        } else {
            throw Error("Bad request: invalid _id value")
        }
    } catch (error) {
        console.error(error)
        return {codeResult: 400}
    }
}

module.exports = {DeleteNew}
