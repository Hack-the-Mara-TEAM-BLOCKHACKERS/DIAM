const diamModel = require('../../model/model')
const ID = require("nodejs-unique-numeric-id-generator");
let yourID = ID.generate(new Date().toJSON());



const home = (req, res, next) => {
    res.json("Ayo Solomon,Chinwendu Iheanetu,Micheal Oladipopo presents Sopa-Ereto first place winner at Hack The Mara"
    );
}

const addRanger = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName = removeSpaces(req.body.middleName.toUpperCase());
    diamModel.rangerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName: req.body.lastName.toUpperCase(), middleName: cleanmiddleName }, (err, data) => {
        try {
            if (!data) {
                const newDiam = new diamModel.rangerModel({
                    firstName: req.body.firstName.toUpperCase(),
                    lastName: req.body.lastName.toUpperCase(),
                    middleName: cleanmiddleName,
                    fullName: `${req.body.firstName.toUpperCase()} ${cleanmiddleName} ${req.body.lastName.toUpperCase()}`,
                    phone: req.body.phoneNumber,
                    accountNumber: req.body.accountNumber,
                    salary: req.body.salary,
                    idNumber: yourID,
                    dateOfBirth: req.body.dob,
                    userAddress: req.body.address,
                    gender: req.body.gender,
                    isActive: false,
                    userPin: null,


                })

                newDiam.save((err, response) => {
                    if (err) return res.json({
                        Error: err
                    });
                    return res.json({
                        status: 'SE200',
                        "data": response
                    });

                })
            } else {
                if (err) return res.json({
                    Error: 'something went wrong $err'
                });
                return res.json({
                    status: 'SE302',
                    data: 'User already exist'
                });

            }
        } catch (error) {

        }

    })
}

const validateLandOwner = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName = removeSpaces(req.body.middleName);
    var name = req.body.firstName
    var last = req.body.lastName
    name.toUpperCase();
    last.toUpperCase()
    diamModel.landOwnerModel.findOne({ firstName: name, lastName: last, middleName: cleanmiddleName }, (err, data) => {

        try {
            if (data) {
                return res.json({
                    status: 'SE200',
                    data: data
                });
            } else {
                if (err) return res.json({
                    status: 'SE500',
                    Error: 'something went wrong $err'
                });
                return res.json({
                    status: 'SE404',
                    error: 'User not found'
                });

            }
        } catch (error) {

        }
    })

};

const validateRanger = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName = removeSpaces(req.body.middleName.toUpperCase());
    diamModel.rangerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName: req.body.lastName, middleName: cleanmiddleName }, (err, data) => {

        if (data) {
            return res.json({
                status: 'SE200',
                data: data
            });
        } else {
            if (err) return res.json({
                status: 'SE500',
                Error: 'something went wrong $err'
            });
            return res.json({
                status: 'SE404',
                error: 'User not found'
            });

        }
    })

};

const addLandOwner = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');

    diamModel.landOwnerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName: req.body.lastName.toUpperCase(), middleName: req.body.middleName.toUpperCase() }, (err, data) => {
        let cleanmiddleName = removeSpaces(req.body.middleName.toUpperCase());
        if (!data) {
            const newDiam = new diamModel.landOwnerModel({
                firstName: req.body.firstName.toUpperCase(),
                lastName: req.body.lastName.toUpperCase(),
                middleName: cleanmiddleName,
                fullName: `${req.body.firstName.toUpperCase()} ${cleanmiddleName} ${req.body.lastName.toUpperCase()}`,
                userAddress: req.body.address,
                phone: req.body.phoneNumber,
                accountNumber: req.body.accountNumber,
                leaseFee: req.body.leaseFee,
                gender: req.body.gender,
                acreSize: req.body.landSize,
                dateOfBirth: req.body.dob,
                conservancy: req.body.conservancy,
                userPin: '',
                idNumber: yourID,
                isActive: false,
            })

            newDiam.save((err, response) => {
                if (err) return res.json({
                    Error: err
                });
                return res.json({
                    status: 200,
                    "data": response
                });

            })
        } else {
            if (err) return res.json({
                Error: 'something went wrong $err'
            });
            return res.json({
                status: 302,
                data: 'User already exist'
            });

        }
    })
}


const viewAllLandOwner = (req, res, next) => {


    diamModel.landOwnerModel.find({}, (err, data) => {
        try {
            res.send({
                status: "SE200",
                data
            })
        } catch (error) {
            res.send({
                status: "SE500",
                err
            })
        }

    })
}


const viewAllRangers = (req, res, next) => {


    diamModel.rangerModel.find({}, (err, data) => {
        try {
            res.send({
                status: "SE200",
                data
            })
        } catch (error) {
            res.send({
                status: "SE500",
                err
            })
        }

    })
}







module.exports = {
    home,
    addLandOwner,
    addRanger,
    viewAllLandOwner,
    viewAllRangers,
    validateRanger,
    validateLandOwner

};