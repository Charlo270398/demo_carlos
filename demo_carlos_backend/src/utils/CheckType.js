
async function CheckListType(checkList = [{fieldValue, fieldName: 'unknown', type, checkNotUndefined: false}]) {
        //Check value types
        for (const {fieldValue, fieldName, type, checkNotUndefined} of checkList) {
            if(checkNotUndefined === true && typeof fieldValue === 'undefined'){
                throw Error(`Bad request: invalid ${fieldName} value (undefined)`)
            }
            if(typeof fieldValue !== type){
                throw Error(`Bad request: invalid ${fieldName} value (wrong type)`)
            }
        }
}

module.exports = {CheckListType}