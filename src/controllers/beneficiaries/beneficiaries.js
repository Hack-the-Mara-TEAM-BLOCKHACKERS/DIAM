const diamModel = require('../../model/model')





const home = (req, res, next) => {
    res.json("Ayo Solomon,Chinwendu Iheanetu,Micheal Oladipopo presents Sopa-Ereto first place winner at Hack The Mara"
    );
}

const addRanger = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName=removeSpaces( req.body.middleName.toUpperCase());
    diamModel.rangerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName: req.body.lastName.toUpperCase(), middleName: cleanmiddleName }, (err, data) => {
 
        if (!data) {
            const newDiam = new diamModel.rangerModel({
                firstName: req.body.firstName.toUpperCase(),
                lastName: req.body.lastName.toUpperCase(),
                middleName: cleanmiddleName,
                fullName:`${req.body.firstName.toUpperCase()} ${cleanmiddleName} ${req.body.lastName.toUpperCase()}`,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                accountNumber: req.body.accountNumber,
                salary: req.body.salary,

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

const validateLandOwner = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName=removeSpaces( req.body.middleName.toUpperCase());
    diamModel.landOwnerModel.findOne({ firstName: req.body.firstName.toUpperCase().trim(), lastName: req.body.lastName.toUpperCase().trim(), middleName:cleanmiddleName}, (err, data) => {
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

const validateRanger = (req, res, next) => {
    const removeSpaces = str => str.replace(/\s/g, '');
    var cleanmiddleName=removeSpaces( req.body.middleName.toUpperCase());
    diamModel.rangerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName:req.body.lastName, middleName:cleanmiddleName}, (err, data) => {
       
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
  
    diamModel.landOwnerModel.findOne({ firstName: req.body.firstName.toUpperCase(), lastName: req.body.lastName.toUpperCase(), middleName: req.body.middleName.toUpperCase()}, (err, data) => {
        let cleanmiddleName=removeSpaces( req.body.middleName.toUpperCase());
        if (!data) {
            const newDiam = new diamModel.landOwnerModel({
                firstName: req.body.firstName.toUpperCase(),
                lastName: req.body.lastName.toUpperCase(),
                middleName: cleanmiddleName,
                fullName:`${req.body.firstName.toUpperCase()} ${cleanmiddleName} ${req.body.lastName.toUpperCase()}`,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                accountNumber: req.body.accountNumber,
                leaseFee: req.body.leaseFee,
                gender:req.body.gender,
                landSize:req.body.landSize,
                gender:req.body.gender,
                 dob:req.body.dob,
                 conservancy:req.body.conservancy,

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

module.exports = {
    home,
    addLandOwner,
    addRanger,
    validateRanger,
    validateLandOwner

};