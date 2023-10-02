import { ratesContentModel } from "../models/rates/rates_content_model.js";
import { ratesModel } from "../models/rates/rates_model.js";


export const getRatesData = async (req, res) => {
    try {
        const ratesData = await ratesModel.find().populate('content');
        return res.status(200).json({
            message: 'Success',
            data: ratesData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const addRatesData = async (req, res) => {
    try {
        const { pageHeading, concellationPolicy, content } = req.body;
        const imgHeading = req.files['imgHeading'][0].path;

        const urlImgHeading = 'http://localhost:5000/' + imgHeading.replace(/\\/g, '/');


        const contentArray = [];


        if (content) {
            for (const contentItem of content) {
                const { img, desc } = contentItem;
                const imgPath = img.path;

                const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');


                const newContentItem = new ratesContentModel({
                    img: urlImg,
                    desc,
                });

                await newContentItem.save();

                contentArray.push(newContentItem._id);
            }

        }

        const newRatesData = new ratesModel({
            pageHeading,
            imgHeading: urlImgHeading,
            content: contentArray,
            concellationPolicy,
        });


        await newRatesData.save();

        return res.status(201).json({
            message: 'Rates data added successfully',
            data: newRatesData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editRatesData = async (req, res) => {
    try {
        const { id } = req.params;
        const { pageHeading, concellationPolicy, content } = req.body;


        const ratesData = await ratesModel.findById(id);

        if (!ratesData) {
            return res.status(404).json({ message: 'Rates data not found' });
        }


        if (pageHeading) ratesData.pageHeading = pageHeading;
        if (concellationPolicy) ratesData.concellationPolicy = concellationPolicy;


        if (content) {

            for (const contentItem of content) {
                const { _id, img, desc } = contentItem;


                const contentItemToUpdate = await ratesContentModel.findById(_id);

                if (contentItemToUpdate) {

                    if (img) {
                        const imgPath = img.path;
                        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
                        contentItemToUpdate.img = urlImg;
                    }
                    if (desc) contentItemToUpdate.desc = desc;


                    await contentItemToUpdate.save();
                }
            }
        }


        await ratesData.save();

        return res.status(200).json({
            message: 'Rates data updated successfully',
            data: ratesData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const addRatesContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc } = req.body;

        const rate = await ratesModel.findById(id);
        if (!rate) {
            return res.status(404).json({ message: 'Rates data not found' });
        }

        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');

        const newRatesContent = new ratesContentModel({
            img: urlImg,
            desc,
        });

        await newRatesContent.save();
        const contentArray = rate.content;
        contentArray.push(newRatesContent._id);
        rate.content = contentArray;
        await rate.save();
        return res.status(201).json({
            message: 'Rates content added successfully',
            data: newRatesContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editRatesContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { img, desc } = req.body;

        const ratesContent = await ratesContentModel.findById(id);

        if (!ratesContent) {
            return res.status(404).json({ message: 'Rates content not found' });
        }

        if (img) {

            const imgPath = req.files['img'][0].path;
            const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
            ratesContent.img = urlImg;
        }
        if (desc) ratesContent.desc = desc;

        await ratesContent.save();

        return res.status(200).json({
            message: 'Rates content updated successfully',
            data: ratesContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteRatesContent = async (req, res) => {
    try {
        const { rateId, id } = req.params;

        const rate = await ratesModel.findById(rateId);
        if (!rate) {
            return res.status(404).json({ message: 'Rates data not found' });
        }
        rate.content = rate.content.pull(id);
        await rate.save();
        const deletedRatesContent = await ratesContentModel.findByIdAndRemove(id);

        if (!deletedRatesContent) {
            return res.status(404).json({ message: 'Rates content not found' });
        }

        return res.status(200).json({
            message: 'Rates content deleted successfully',
            data: deletedRatesContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};