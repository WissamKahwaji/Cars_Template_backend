import { serviceContent } from "../models/services/service_content_model.js";
import { serviceModel } from "../models/services/services_model.js";

export const getServicesData = async (req, res) => {
    try {
        const servicesData = await serviceModel.findOne().populate('content');
        return res.status(200).json({
            message: 'Success',
            data: servicesData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const addServicesData = async (req, res) => {
    try {
        const { pageHeading, descHeading, content } = req.body;



        const contentArray = [];


        if (content) {
            for (const contentItem of content) {
                const { img, title, desc } = contentItem;
                const imgPath = img.path;

                const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');


                const newContentItem = new ratesContentModel({
                    img: urlImg,
                    title,
                    desc,
                });

                await newContentItem.save();

                contentArray.push(newContentItem._id);
            }

        }

        const newServiceData = new serviceModel({
            pageHeading,
            descHeading,
            content: contentArray,
        });


        await newServiceData.save();

        return res.status(201).json({
            message: 'Services data added successfully',
            data: newServiceData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const { pageHeading, descHeading, content } = req.body;


        const servicesData = await serviceModel.findById(id);

        if (!servicesData) {
            return res.status(404).json({ message: 'Services data not found' });
        }


        if (pageHeading) servicesData.pageHeading = pageHeading;
        if (descHeading) servicesData.descHeading = descHeading;


        if (content) {

            for (const contentItem of content) {
                const { _id, img, title, desc } = contentItem;


                const contentItemToUpdate = await serviceContent.findById(_id);

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


        await servicesData.save();

        return res.status(200).json({
            message: 'Service data updated successfully',
            data: servicesData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const addServiceContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;

        const service = await serviceModel.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service data not found' });
        }

        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');

        const newServiceContent = new serviceContent({
            img: urlImg,
            title,
            desc,
        });

        await newServiceContent.save();
        const contentArray = service.content;
        contentArray.push(newServiceContent._id);
        service.content = contentArray;
        await service.save();
        return res.status(201).json({
            message: 'Service content added successfully',
            data: newServiceContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const editServiceContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { img, title, desc } = req.body;

        const serviceDataContent = await serviceContent.findById(id);

        if (!serviceDataContent) {
            return res.status(404).json({ message: 'Service content not found' });
        }

        if (img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
            serviceDataContent.img = urlImg;
        }
        if (desc) serviceDataContent.desc = desc;
        if (title) serviceDataContent.title = title;
        await serviceDataContent.save();

        return res.status(200).json({
            message: 'Service content updated successfully',
            data: serviceDataContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const deleteServiceContent = async (req, res) => {
    try {
        const { serviceId, id } = req.params;

        const service = await serviceModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service data not found' });
        }
        service.content = service.content.pull(id);
        await service.save();
        const deletedServiceContent = await serviceContent.findByIdAndRemove(id);

        if (!deletedServiceContent) {
            return res.status(404).json({ message: 'Service content not found' });
        }

        return res.status(200).json({
            message: 'Service content deleted successfully',
            data: deletedServiceContent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};