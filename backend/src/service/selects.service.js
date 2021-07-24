let Selects = require("../models/selects.model");

export const selectData = async() => {
    let selections = []
    await Selects.find({}, function (err, selects) {
        console.log(selects)
        console.log('--')
        selections = selects
    });
    return selections
}