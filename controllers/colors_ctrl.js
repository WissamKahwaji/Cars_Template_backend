import { ColorsModel } from "../models/colors/colors_model.js";


export const getColors = async (req, res) => {
    try {
        const colors = await ColorsModel.find();
        return res.status(200).json({
            message: 'Success',
            data: colors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addColors = async (req, res) => {
    try {
        const { mainColor, navColor } = req.body;


        const newColor = new ColorsModel({ mainColor, navColor });


        await newColor.save();

        return res.status(201).json({
            message: 'Color added successfully',
            data: newColor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

