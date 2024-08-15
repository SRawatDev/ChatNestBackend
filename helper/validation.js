import _ from "lodash"
const Backendvalidation=async(validation,response)=>{
    if (validation.fails()) {
        let err_msg_all = "";
        let msg = "";
        _.each(validation.errors.errors, (err_msg, key) => {
            msg = key;
            err_msg_all = err_msg;
        });
        return response
            .status(200)
            .json({ status: false, message: validation.errors.first(msg) });
    }
}
export default Backendvalidation