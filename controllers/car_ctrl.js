import { carModel } from "../models/cars/car_model.js";
import { carPageModel } from "../models/cars/car_page_model.js";
import { carRateModel } from "../models/cars/car_rate_model.js";


export const getCarPageData = async (req, res) => {
    try {
        // const carPageData = await carPageModel.findOne().populate({
        //     path: 'categoryOneContent',
        //     populate: [
        //         { path: 'carRate', }
        //     ],
        // }).populate({
        //     path: 'categoryTwoContent',
        //     populate: [
        //         { path: 'carRate', }
        //     ],
        // }).populate({
        //     path: 'categoryThreeContent',
        //     populate: [
        //         { path: 'carRate', }
        //     ],
        // });
        const carPageData = await carPageModel.findOne().populate('categoryOneContent').populate('categoryTwoContent').populate('categoryThreeContent');
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
        const { pageHeading, descHeading, categoryOne, categoryTwo, categoryOneContent, categoryTwoContent, categoryThreeContent, concellationPolicy } = req.body;

        const imgPath = req.files['img'][0].path;
        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');

        const contentArray = [];
        const contentTwoArray = [];
        const contentThreeArray = [];

        if (categoryOneContent) {
            for (const contentItem of categoryOneContent) {
                const { img, title, desc, imgs } = contentItem;
                const imgPath = img.path;

                const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');




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

                        const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                        imageUrls.push(imageUrl);
                        newContentItem.imgs = imageUrls;
                    }
                }

                await newContentItem.save();

                contentArray.push(newContentItem._id);
            }

        }
        if (categoryTwoContent) {
            for (const contentItem of categoryTwoContent) {
                const { img, title, desc, imgs } = contentItem;
                const imgPath = img.path;

                const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');




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

                        const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                        imageUrls.push(imageUrl);
                        newContentItem.imgs = imageUrls;
                    }
                }

                await newContentItem.save();

                contentTwoArray.push(newContentItem._id);
            }

        }
        if (categoryThreeContent) {
            for (const contentItem of categoryThreeContent) {
                const { img, title, desc, imgs } = contentItem;
                const imgPath = img.path;

                const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');




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

                        const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                        imageUrls.push(imageUrl);
                        newContentItem.imgs = imageUrls;
                    }
                }

                await newContentItem.save();

                contentThreeArray.push(newContentItem._id);
            }

        }

        const newCarPageData = new carPageModel({
            pageHeading,
            descHeading,
            img: urlImg,
            categoryOne: categoryOne,
            categoryTwo: categoryTwo,
            categoryOneContent: contentArray,
            categoryTwoContent: contentTwoArray,
            categoryThreeContent: contentThreeArray,
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
        const { pageHeading, descHeading, categoryOne, categoryTwo, categoryThree, img, categoryOneContent, categoryTwoContent, categoryThreeContent, concellationPolicy } = req.body;


        const carPageData = await carPageModel.findById(id);

        if (!carPageData) {
            return res.status(404).json({ message: 'Car Page data not found' });
        }


        if (pageHeading) carPageData.pageHeading = pageHeading;
        if (descHeading) carPageData.descHeading = descHeading;
        if (categoryOne) carPageData.categoryOne = categoryOne;
        if (categoryTwo) carPageData.categoryTwo = categoryTwo;
        if (categoryThree) carPageData.categoryThree = categoryThree;

        if (concellationPolicy) carPageData.concellationPolicy = concellationPolicy;
        if (img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
            carPageData.img = urlImg;
        }


        if (categoryOneContent) {

            for (const contentItem of categoryOneContent) {
                const { _id, img, title, desc, imgs } = contentItem;


                const contentItemToUpdate = await carModel.findById(_id);

                if (contentItemToUpdate) {

                    if (img) {
                        const imgPath = img.path;
                        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
                        contentItemToUpdate.img = urlImg;
                    }
                    if (desc) contentItemToUpdate.desc = desc;
                    if (title) contentItemToUpdate.title = title;


                    await contentItemToUpdate.save();
                }
            }
        }
        if (categoryTwoContent) {

            for (const contentItem of categoryTwoContent) {
                const { _id, img, title, desc, imgs } = contentItem;


                const contentItemToUpdate = await carModel.findById(_id);

                if (contentItemToUpdate) {

                    if (img) {
                        const imgPath = img.path;
                        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
                        contentItemToUpdate.img = urlImg;
                    }
                    if (desc) contentItemToUpdate.desc = desc;
                    if (title) contentItemToUpdate.title = title;


                    await contentItemToUpdate.save();
                }
            }
        }
        if (categoryThreeContent) {

            for (const contentItem of categoryThreeContent) {
                const { _id, img, title, desc, imgs } = contentItem;


                const contentItemToUpdate = await carModel.findById(_id);

                if (contentItemToUpdate) {

                    if (img) {
                        const imgPath = img.path;
                        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
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

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findById(id);
        return res.status(200).json({
            message: ' successfully',
            data: car,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const addCarToCategoryOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, rates_description, carRate } = req.body;

        const carPage = await carPageModel.findById(id);
        if (!carPage) {
            return res.status(404).json({ message: 'CarPage data not found' });
        }
        let urlImg;
        if (req.files['img']) {
            const imgPath = req.files['img'][0].path;
            urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
        }

        const car = new carModel({
            img: urlImg,
            title,
            desc,
            rates_description,
            carRate,
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

                const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                car.imgs = imageUrls;
            }
        }

        await car.save();
        const contentArray = carPage.categoryOneContent;
        contentArray.push(car._id);
        carPage.categoryOneContent = contentArray;
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
export const addCarToCategoryTwo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, rates_description, carRate } = req.body;

        const carPage = await carPageModel.findById(id);
        if (!carPage) {
            return res.status(404).json({ message: 'CarPage data not found' });
        }

        const imgPath = req.files['img'][0].path;
        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');

        const car = new carModel({
            img: urlImg,
            title,
            desc,
            rates_description, carRate
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

                const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                car.imgs = imageUrls;
            }
        }

        await car.save();
        const contentArray = carPage.categoryTwoContent;
        contentArray.push(car._id);
        carPage.categoryTwoContent = contentArray;
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

export const addCarToCategoryThree = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, rates_description, carRate } = req.body;

        const carPage = await carPageModel.findById(id);
        if (!carPage) {
            return res.status(404).json({ message: 'CarPage data not found' });
        }

        const imgPath = req.files['img'][0].path;
        const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');

        const car = new carModel({
            img: urlImg,
            title,
            desc,
            rates_description,
            carRate
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

                const imageUrl = 'https://www.rallyback.siidevelopment.com/' + image.path.replace(/\\/g, '/');
                imageUrls.push(imageUrl);
                car.imgs = imageUrls;
            }
        }

        await car.save();
        const contentArray = carPage.categoryThreeContent;
        contentArray.push(car._id);
        carPage.categoryThreeContent = contentArray;
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
        const { img, title, desc, imgs, rates_description, carRate } = req.body;

        const car = await carModel.findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'https://www.rallyback.siidevelopment.com/' + imgPath.replace(/\\/g, '/');
            car.img = urlImg;
        }
        if (desc) car.desc = desc;
        if (title) car.title = title;
        if (rates_description) car.rates_description = rates_description;
        if (carRate) car.carRate = carRate;

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
        // carPage.content = carPage.content.pull(id);
        // await carPage.save();
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


export const getCarRate = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findById(id);
        const rateId = car.carRate;
        const rate = await carRateModel.findById(rateId);
        return res.status(200).json({
            message: 'get Car Rate successfully',
            data: rate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const addCarRate = async (req, res) => {

    try {
        const { id } = req.params;
        const { newRate } = req.body;

        const car = await carModel.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car data not found' });
        }
        car.carRate.push(newRate);
        // const carRate = new carRateModel({
        //     title: title,
        //     price: price,
        // });
        await car.save();


        return res.status(201).json({
            message: 'Car added successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const editCarRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { newRates } = req.body;


        const car = await carModel.findById(id);

        if (!car) {
            return res.status(404).json('Car not found');
        }


        car.carRate = newRates;


        await car.save();

        return res.status(200).json('Car rates updated successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}