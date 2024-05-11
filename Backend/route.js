const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail} = require('./controllers/admin.js');

 const { studentclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('./controllers/class.js');

 const { complainCreate, complainList } = require('./controllers/complain.js');

 const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('./controllers/notice.js');

 const {studentRegister,studentLogIn,getStudents,getStudentDetail,deleteStudents,deleteStudent,updateStudent,studentAttendance,deleteStudentsByClass,updateExamResult,clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance } = require('./controllers/student.js');
 const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('./controllers/subject.js');

 const { professorRegister, professorLogIn, getprofessors, getprofessorDetail, deleteprofessors, deleteprofessorsByClass, deleteprofessor, updateprofessorSubject, professorAttendance } = require('./controllers/professor.js');


// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail)




// Student
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdatesemResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// // professor

router.post('/professorReg', professorRegister);
router.post('/professorLogin', professorLogIn)

router.get("/professors/:id", getprofessors)
router.get("/professor/:id", getprofessorDetail)

router.delete("/professors/:id", deleteprofessors)
router.delete("/professorsClass/:id", deleteprofessorsByClass)
router.delete("/professor/:id", deleteprofessor)

router.put("/professorSubject", updateprofessorSubject)

router.post('/professorAttendance/:id', professorAttendance)

// // Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// // Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// // Sclass

router.post('/SclassCreate', studentclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// // Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

module.exports = router;