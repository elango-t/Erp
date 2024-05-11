const bcrypt = require('bcrypt');
const professor = require('../models/professorSchema.js');
const Subject = require('../models/subjectSchema.js');

const professorRegister = async (req, res) => {
    const { name, email, password, role,college, teachSubject, teachSclass } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const professor = new professor({ name, email, password: hashedPass, role,college, teachSubject, teachSclass });

        const existingprofessorByEmail = await professor.findOne({ email });

        if (existingprofessorByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await professor.save();
            await Subject.findByIdAndUpdate(teachSubject, { professor: professor._id });
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const professorLogIn = async (req, res) => {
    try {
        let professor = await professor.findOne({ email: req.body.email });
        if (professor) {
            const validated = await bcrypt.compare(req.body.password, professor.password);
            if (validated) {
                professor = await professor.populate("teachSubject", "subName sessions")
                professor = await professor.populate("school", "schoolName")
                professor = await professor.populate("teachSclass", "sclassName")
                professor.password = undefined;
                res.send(professor);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "professor not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getprofessors = async (req, res) => {
    try {
        let professors = await professor.find({college: req.params.id })
            .populate("teachSubject", "subName")
            .populate("teachSclass", "sclassName");
        if (professors.length > 0) {
            let modifiedprofessors = professors.map((professor) => {
                return { ...professor._doc, password: undefined };
            });
            res.send(modifiedprofessors);
        } else {
            res.send({ message: "No professors found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getprofessorDetail = async (req, res) => {
    try {
        let professor = await professor.findById(req.params.id)
            .populate("teachSubject", "subName sessions")
            .populate("school", "schoolName")
            .populate("teachSclass", "sclassName")
        if (professor) {
            professor.password = undefined;
            res.send(professor);
        }
        else {
            res.send({ message: "No professor found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateprofessorSubject = async (req, res) => {
    const { professorId, teachSubject } = req.body;
    try {
        const updatedprofessor = await professor.findByIdAndUpdate(
            professorId,
            { teachSubject },
            { new: true }
        );

        await Subject.findByIdAndUpdate(teachSubject, { professor: updatedprofessor._id });

        res.send(updatedprofessor);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteprofessor = async (req, res) => {
    try {
        const deletedprofessor = await professor.findByIdAndDelete(req.params.id);

        await Subject.updateOne(
            { professor: deletedprofessor._id, professor: { $exists: true } },
            { $unset: { professor: 1 } }
        );

        res.send(deletedprofessor);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteprofessors = async (req, res) => {
    try {
        const deletionResult = await professor.deleteMany({college: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No professors found to delete" });
            return;
        }

        const deletedprofessors = await professor.find({college: req.params.id });

        await Subject.updateMany(
            { professor: { $in: deletedprofessors.map(professor => professor._id) }, professor: { $exists: true } },
            { $unset: { professor: "" }, $unset: { professor: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteprofessorsByClass = async (req, res) => {
    try {
        const deletionResult = await professor.deleteMany({ sclassName: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No professors found to delete" });
            return;
        }

        const deletedprofessors = await professor.find({ sclassName: req.params.id });

        await Subject.updateMany(
            { professor: { $in: deletedprofessors.map(professor => professor._id) }, professor: { $exists: true } },
            { $unset: { professor: "" }, $unset: { professor: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const professorAttendance = async (req, res) => {
    const { status, date } = req.body;

    try {
        const professor = await professor.findById(req.params.id);

        if (!professor) {
            return res.send({ message: 'professor not found' });
        }

        const existingAttendance = professor.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            professor.attendance.push({ date, status });
        }

        const result = await professor.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    professorRegister,
    professorLogIn,
    getprofessors,
    getprofessorDetail,
    updateprofessorSubject,
    deleteprofessor,
    deleteprofessors,
    deleteprofessorsByClass,
    professorAttendance
};