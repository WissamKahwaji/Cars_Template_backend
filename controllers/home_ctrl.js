import { homeModel } from "../models/home/home_model.js";



export const getHomeData = async (req, res) => {
    try {
        const homeData = await homeModel.findOne();

        return res.status(200).json({
            message: 'Success',
            data: homeData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addHomeData = async (req, res) => {
    try {
        const {
            brandName,
            brandDesc,
            phoneNumber,
            mobileNumber,
            whatsApp,
            mailId,
            instagram,
            facebook,
            twitter,
            linkedIn,
            youtube,
            location,
        } = req.body;


        const landingImg = req.files['landingImg'][0].path;
        const logoImg = req.files['logoImg'][0].path;


        const urlLandingImg = 'https://www.rallyback.siidevelopment.com/' + landingImg.replace(/\\/g, '/');
        const urlLogoImg = 'https://www.rallyback.siidevelopment.com/' + logoImg.replace(/\\/g, '/');

        const newHomeData = new homeModel({
            landingImg: urlLandingImg,
            brandName,
            brandDesc,
            logoImg: urlLogoImg,
            phoneNumber,
            mobileNumber,
            whatsApp,
            mailId,
            instagram,
            facebook,
            twitter,
            linkedIn,
            youtube,
            location
        });


        await newHomeData.save();

        return res.status(201).json({
            message: 'Home data added successfully',
            data: newHomeData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

};

export const editHomeData = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            brandName,
            brandDesc,
            phoneNumber,
            mobileNumber,
            whatsApp,
            mailId,
            instagram,
            facebook,
            twitter,
            linkedIn,
            youtube,
            location
        } = req.body;

        console.log(req.files['landingImg']);
        if (!req.files || (!req.files['landingImg'] && !req.files['logoImg'])) {

            const updatedData = {
                brandName,
                brandDesc,
                phoneNumber,
                mobileNumber,
                whatsApp,
                mailId,
                instagram,
                facebook,
                twitter,
                linkedIn,
                youtube,
                location
            };


            const updatedHomeData = await homeModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

            if (!updatedHomeData) {
                return res.status(404).json({ message: 'Home data not found' });
            }

            return res.status(200).json({
                message: 'Home data updated successfully',
                data: updatedHomeData,
            });
        }

        const landingImgPath = req.files['landingImg'][0].path;
        const logoImgPath = req.files['logoImg'][0].path;

        const urlLandingImg = 'https://www.rallyback.siidevelopment.com/' + landingImgPath.replace(/\\/g, '/');
        const urlLogoImg = 'https://www.rallyback.siidevelopment.com/' + logoImgPath.replace(/\\/g, '/');

        const homeData = await homeModel.findById(id);

        if (!homeData) {
            return res.status(404).json({ message: 'Home data not found' });
        }

        if (brandName) homeData.brandName = brandName;
        if (brandDesc) homeData.brandDesc = brandDesc;
        if (phoneNumber) homeData.phoneNumber = phoneNumber;
        if (mobileNumber) homeData.mobileNumber = mobileNumber;
        if (whatsApp) homeData.whatsApp = whatsApp;
        if (mailId) homeData.mailId = mailId;
        if (instagram) homeData.instagram = instagram;
        if (facebook) homeData.facebook = facebook;
        if (twitter) homeData.twitter = twitter;
        if (linkedIn) homeData.linkedIn = linkedIn;
        if (youtube) homeData.youtube = youtube;
        if (location) homeData.location = location;

        homeData.landingImg = urlLandingImg;
        homeData.logoImg = urlLogoImg;

        await homeData.save();

        return res.status(200).json({
            message: 'Home data updated successfully',
            data: homeData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};