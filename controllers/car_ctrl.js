import { carModel } from "../models/cars/car_model.js";
import { carPageModel } from "../models/cars/car_page_model.js";


export const getCarPageData = async (req, res) => {
    try {
        const carPageData = await carPageModel.findOne().populate('content');
        return res.status(200).json({
            message: 'Success',
            data: carPageData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const addCarPageData = async (req, res) => {
    try {
        const { pageHeading, descHeading, content, concellationPolicy } = req.body;

        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');

        const contentArray = [];


        if (content) {
            for (const contentItem of content) {
                const { img, title, desc, imgs } = contentItem;
                const imgPath = img.path;

                const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');




                const newContentItem = new carModel({
                    img: urlImg,
                    title,
                    desc,
                });

                if (req.files['imgs']) {
                    const carImages = req.files['imgs'];
                    const imageUrls = [];
                    if (!carImages || !Array.isArray(carImages)) {
                        return res.status(404).json({ message: 'Attached files are missing or invalid.' });
                    }

                    for (const image of carImages) {
                        if (!image) {
                            return res.status(404).json({ message: 'Attached file is not an image.' });
                        }

                        const imageUrl = 'http://localhost:5000/' + image.path.replace(/\\/g, '/');
                        imageUrls.push(imageUrl);
                        newContentItem.imgs = imageUrls;
                    }
                }

                await newContentItem.save();

                contentArray.push(newContentItem._id);
            }

        }

        const newCarPageData = new carPageModel({
            pageHeading,
            descHeading,
            img: urlImg,
            content: contentArray,
            concellationPolicy
        });


        await newCarPageData.save();

        return res.status(201).json({
            message: 'CarPage data added successfully',
            data: newCarPageData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editCarPageData = async (req, res) => {
    try {
        const { id } = req.params;
        const { pageHeading, descHeading, img, content,concellationPolicy } = req.body;


        const carPageData = await carPageModel.findById(id);

        if (!carPageData) {
            return res.status(404).json({ message: 'Car Page data not found' });
        }


        if (pageHeading) carPageData.pageHeading = pageHeading;
        if (descHeading) carPageData.descHeading = descHeading;
        if(concellationPolicy) carPageData.concellationPolicy=concellationPolicy;
        if (img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
            carPageData.img = urlImg;
        }


        if (content) {

            for (const contentItem of content) {
                const { _id, img, title, desc, imgs } = contentItem;


                const contentItemToUpdate = await carModel.findById(_id);

                if (contentItemToUpdate) {

                    if (img) {
                        const imgPath = img.path;
                        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
                        contentItemToUpdate.img = urlImg;
                    }
                    if (desc) contentItemToUpdate.desc = desc;
                    if (title) contentItemToUpdate.title = title;


                    await contentItemToUpdate.save();
                }
            }
        }


        await carPageData.save();

        return res.status(200).json({
            message: 'CarPage data updated successfully',
            data: carPageData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const addCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc,rates_description } = req.body;

        const carPage = await carPageModel.findById(id);
        if (!carPage) {
            return res.status(404).json({ message: 'CarPage data not found' });
        }

        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');

        const car = new carModel({
            img: urlImg,
            title,
            desc,
            rates_description,
        });
        if (req.files['imgs']) {
            const carImages = req.files['imgs'];
            const imageUrls = [];
            if (!carImages || !Array.isArray(carImages)) {
                return res.status(404).json({ message: 'Attached files are missing or invalid.' });
            }

            for (const image of carImages) {
                if (!image) {
                    return res.status(404).json({ message: 'Attached file is not an image.' });
                }

                const imageUrl = 'http://localhost:5000/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                car.imgs = imageUrls;
            }
        }

        await car.save();
        const contentArray = carPage.content;
        contentArray.push(car._id);
        carPage.content = contentArray;
        await carPage.save();
        return res.status(201).json({
            message: 'Car added successfully',
            data: car,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { img, title, desc, imgs,rates_description } = req.body;

        const car = await carModel.findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
            car.img = urlImg;
        }
        if (desc) car.desc = desc;
        if (title) car.title = title;
        if(rates_description) car.rates_description=rates_description;

        await car.save();

        return res.status(200).json({
            message: 'Car updated successfully',
            data: car,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { carPageId, id } = req.params;

        const carPage = await carPageModel.findById(carPageId);
        if (!carPage) {
            return res.status(404).json({ message: 'CarPage data not found' });
        }
        carPage.content = carPage.content.pull(id);
        await carPage.save();
        const deletedCar = await carModel.findByIdAndRemove(id);

        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        return res.status(200).json({
            message: 'Car deleted successfully',
            data: deletedCar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};