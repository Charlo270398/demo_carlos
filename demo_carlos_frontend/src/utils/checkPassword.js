export default function checkPassword(password = ''){
    try {
        if(!RegExp("(?=.{8,})").test(password)){
            return {result: false, error: 'Password must have at least 8 characters'}
        } else if(!RegExp("(?=.*[A-Z])").test(password)){
            return {result: false, error: 'Password must have at least one uppercase letter' };
        } else if(!RegExp("(?=.*[0-9])").test(password)){
            return {result: false, error: 'Password must have at least one digit' };
        } else if(!RegExp("([^A-Za-z0-9])").test(password)){
            return {result: false, error: 'Password must have at least one special character' };
        }
        return {result: true, error: null}
    } catch (error) {
        console.error(error)
        return {result: false, error: error};
    }
}