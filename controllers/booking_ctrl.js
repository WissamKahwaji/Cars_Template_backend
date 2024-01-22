import { bookingModel } from "../models/booking/booking_model.js";
import nodemailer from "nodemailer";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate("car");
    const simplifiedBookings = bookings.map(booking => ({
      carModel: booking.car.model,
      userFullName: booking.fullName,
      reservationDate: booking.reservationDate,
    }));
    return res.status(200).json({
      message: "Success",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingModel.find({ userId }).populate("car");
    return res.status(200).json({
      message: "Success",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addBooking = async (req, res) => {
  const {
    userId,
    fullName,
    mobile,
    email,
    Duration,
    car,
    from,
    to,
    reservationDate,
    comments,
    status,
  } = req.body;

  try {
    const newBooking = new bookingModel({
      userId,
      fullName,
      mobile,
      email,
      Duration,
      car,
      from,
      to,
      reservationDate,
      comments,
      status,
    });

    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create a booking" });
  }
};

export const sendBookingEmail = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      mobile,
      email,
      pickUpDate,
      dropOffDate,
      car,
      from,
      to,
      reservationDate,
      comments,
    } = req.body;
    console.log("111111111");
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "Netzoon.2023@gmail.com",
        pass: "gncp ypax rnfm apxh",
      },
      secure: true,
    });
    const mailOptions = {
      from: email,
      to: "netzoon.2023@gmail.com",
      subject: `New Booking from ${fullName}`,
      html: `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>pickUpDate:</strong> ${pickUpDate}</p>
      <p><strong>dropOffDate:</strong> ${dropOffDate}</p>
      <p><strong>Car:</strong> ${car}</p>
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Reservation Date:</strong> ${reservationDate}</p>
      <p><strong>Comments:</strong> ${comments}</p>
    `,
    };
    console.log("22222222");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Enquiry submitted successfully");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send a booking" });
  }
};
