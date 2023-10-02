import { navModel } from "../models/nav/nav_model.js";


export const getNavData = async (req, res) => {
    try {
        const navData = await navModel.find();
        return res.status(200).json({
            message: 'Success',
            data: navData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addNavData = async (req, res) => {
    try {
        const { home, about, contactUs, cars, bookings } = req.body;


        const newNavData = new navModel({ home, about, contactUs, cars, bookings });


        await newNavData.save();

        return res.status(201).json({
            message: 'Nav added successfully',
            data: newNavData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const editNavData = async (req, res) => {
    try {
        const { id } = req.params;
        const { home, about, contactUs, cars, bookings } = req.body;

        const navData = await navModel.findById(id);
        if (!navData) {
            return res.status(404).json({ message: "Nav not found" });
        }
        if(home) navData.home=home;
        if(about) navData.about=about;
        if(contactUs) navData.contactUs=contactUs;
        if(cars) navData.cars=cars;
        if(bookings) navData.bookings=bookings;
        


        await navData.save();

        return res.status(201).json({
            message: 'Nav Edited successfully',
            data: navData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};