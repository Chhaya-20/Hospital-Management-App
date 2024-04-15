const Slot = require("../../models/Slots");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");

exports.BookSlot = async (req, res) => {
    const slotid = req.params.slotid;   // Slot id
    const id = req.user.id;  // Patient id

    try {
        const slot = await Slot.findOne({ _id: slotid });
        if (!slot) {
            return res.status(404).json({ success: false, message: "No slot available with this id...." });
        } else {
            if (!slot.available) {
                return res.status(404).json({ success: false, message: "Slot is already booked...." });
            } else {
                slot.available = false;
                await slot.save();

                // Add slot to doctor's bookedSlots
                const doctorid = slot.id;
                const doctor = await Doctor.findOne({ _id: doctorid });
                doctor.bookslots.push({slotid:slot._id});
                await doctor.save();

                // Add slot to patient's bookedSlots
                const patient = await Patient.findOne({ _id: id });
                patient.bookslots.push({slotid:slot._id});
                await patient.save();

                return res.status(200).json({ success: true, message: "Slot successfully booked...." });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
};
