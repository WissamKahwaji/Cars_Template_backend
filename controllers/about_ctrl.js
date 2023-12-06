import { aboutContentModel } from "../models/about/about_content_model.js";
import { aboutModel } from "../models/about/about_model.js";
import { anotherAboutModel } from "../models/about/another_about_model.js";

export const getAboutData = async (req, res) => {
  try {
    const aboutData = await aboutModel.findOne().populate("content");
    return res.status(200).json({
      message: "Success",
      data: aboutData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addAboutData = async (req, res) => {
  try {
    const {
      pageHeading,
      pageHeadingAr,
      descHeading,
      content,
      secondeTitle,
      secondSectionImgs,
      descHeadingAr,
      secondTitleAr,
    } = req.body;

    const contentArray = [];

    if (content) {
      for (const contentItem of content) {
        const { img, mainTitle, secTitle, desc } = contentItem;
        const imgPath = img.path;

        const urlImg =
          "https://www.rallyback.siidevelopment.com/" +
          imgPath.replace(/\\/g, "/");

        const newContentItem = new aboutContentModel({
          img: urlImg,
          mainTitle,
          secTitle,
          desc,
        });

        await newContentItem.save();

        contentArray.push(newContentItem._id);
      }
    }
    const chfArray = [];
    if (req.files["imgs"]) {
      const chfImages = req.files["imgs"];

      if (!chfImages || !Array.isArray(chfImages)) {
        return res
          .status(404)
          .json({ message: "Attached files are missing or invalid." });
      }

      for (const image of chfImages) {
        if (!image) {
          return res
            .status(404)
            .json({ message: "Attached file is not an image." });
        }

        const imageUrl =
          "https://www.rallyback.siidevelopment.com/" +
          image.path.replace(/\\/g, "/");
        chfArray.push(imageUrl);
      }
    }

    const newAboutData = new aboutModel({
      pageHeading,
      pageHeadingAr,
      descHeading,
      descHeadingAr: descHeadingAr,
      secondTitleAr: secondTitleAr,
      content: contentArray,
      secondeTitle,
      secondSectionImgs: chfArray,
    });

    await newAboutData.save();

    return res.status(201).json({
      message: "About data added successfully",
      data: newAboutData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editAboutData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pageHeading,
      pageHeadingAr,
      descHeading,
      descHeadingAr,
      secondTitleAr,
      content,
      secondeTitle,
      secondSectionImgs,
    } = req.body;

    const aboutData = await aboutModel.findById(id);

    if (!aboutData) {
      return res.status(404).json({ message: "About data not found" });
    }

    if (pageHeading) aboutData.pageHeading = pageHeading;
    if (pageHeadingAr) aboutData.pageHeadingAr = pageHeadingAr;
    if (descHeading) aboutData.descHeading = descHeading;
    if (secondeTitle) aboutData.secondeTitle = secondeTitle;
    if (secondTitleAr) aboutData.secondTitleAr = secondTitleAr;
    if (descHeadingAr) aboutData.descHeadingAr = descHeadingAr;
    if (content) {
      for (const contentItem of content) {
        const { _id, img, mainTitle, secTitle, desc } = contentItem;

        const contentItemToUpdate = await aboutContentModel.findById(_id);

        if (contentItemToUpdate) {
          if (img) {
            const imgPath = img.path;
            const urlImg =
              "https://www.rallyback.siidevelopment.com/" +
              imgPath.replace(/\\/g, "/");
            contentItemToUpdate.img = urlImg;
          }
          if (desc) contentItemToUpdate.desc = desc;
          if (mainTitle) contentItemToUpdate.mainTitle = mainTitle;
          if (secTitle) contentItemToUpdate.secTitle = secTitle;

          await contentItemToUpdate.save();
        }
      }
    }

    await aboutData.save();

    return res.status(200).json({
      message: "About data updated successfully",
      data: aboutData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainTitle, secTitle, desc, descAr, secTitleAr } = req.body;

    const about = await aboutModel.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About data not found" });
    }

    const imgPath = req.files["img"][0].path;
    const urlImg =
      "https://www.rallyback.siidevelopment.com/" + imgPath.replace(/\\/g, "/");

    const newAboutContent = new aboutContentModel({
      img: urlImg,
      mainTitle,
      secTitle,
      desc,
      descAr,
      secTitleAr,
    });

    await newAboutContent.save();
    const contentArray = about.content;
    contentArray.push(newAboutContent._id);
    about.content = contentArray;
    await about.save();
    return res.status(201).json({
      message: "About content added successfully",
      data: newAboutContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, mainTitle, secTitle, desc, descAr, secTitleAr } = req.body;

    const aboutDataContent = await aboutContentModel.findById(id);

    if (!aboutDataContent) {
      return res.status(404).json({ message: "About content not found" });
    }

    if (img) {
      const imgPath = req.files["img"][0].path;
      const urlImg =
        "https://www.rallyback.siidevelopment.com/" +
        imgPath.replace(/\\/g, "/");
      aboutDataContent.img = urlImg;
    }
    if (desc) aboutDataContent.desc = desc;
    if (mainTitle) aboutDataContent.mainTitle = mainTitle;
    if (secTitle) aboutDataContent.secTitle = secTitle;
    if (descAr) aboutDataContent.descAr = descAr;
    if (secTitleAr) aboutDataContent.secTitleAr = secTitleAr;

    await aboutDataContent.save();

    return res.status(200).json({
      message: "About content updated successfully",
      data: aboutDataContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAboutContent = async (req, res) => {
  try {
    const { aboutId, id } = req.params;

    const about = await aboutModel.findById(aboutId);
    if (!about) {
      return res.status(404).json({ message: "About data not found" });
    }
    about.content = about.content.pull(id);
    await about.save();
    const deletedAboutContent = await aboutContentModel.findByIdAndRemove(id);

    if (!deletedAboutContent) {
      return res.status(404).json({ message: "About content not found" });
    }

    return res.status(200).json({
      message: "About content deleted successfully",
      data: deletedAboutContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAnotherAboutData = async (req, res) => {
  try {
    const aboutData = await anotherAboutModel.findOne();
    return res.status(200).json({
      message: "Success",
      data: aboutData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const addOrUpdateAnotherContent = async (req, res) => {
  try {
    const { content } = req.body;
    const imgPath = req.files["img"][0].path;
    const urlImg =
      "https://www.rallyback.siidevelopment.com/" + imgPath.replace(/\\/g, "/");

    const aboutData = await anotherAboutModel.findOne();

    if (!aboutData) {
      // If data doesn't exist, create a new document
      aboutData = new anotherAboutModel({
        img: urlImg,
        content: content,
      });
    } else {
      // If data exists, update it
      aboutData.img = urlImg;
      aboutData.content = content;
    }

    await aboutData.save();

    return res.status(200).json({
      message: "Content added or updated successfully",
      data: aboutData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
