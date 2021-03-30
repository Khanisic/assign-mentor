const express = require('express');
const app = express();

app.use(express.json());

let mentor = [];
let student = [];


app.post('/create-mentor', (req, res) => {
    mentor.push(req.body);
    res.status(200).json({ message : "Mentor created Successfully"});
});

app.get('/display-mentor', (req, res) => {
    res.json(mentor);
});

app.post('/create-student', (req, res) => {
    student.push(req.body);
    res.status(200).json({ message : "Student created Successfully"});
});

app.get('/display-student', (req, res) => {
    res.json(student);
});

app.put('/student/:id', ( req , res ) =>{
    let id = req.params.id;
    let studentData = student[0];
    let teacherData = mentor[0];
    studentData[id - 1].mentorid = req.body.mentorid;
    teacherData[req.body.mentorid - 1].studentid.push(studentData[id - 1].studentid);
    res.status(200).json({ message : " Mentor Assigned "});
});

app.put('/mentor/:id', ( req , res ) =>{
    let id = req.params.id;
    let studentData = student[0];
    let teacherData = mentor[0];
    teacherData[req.params.id - 1].studentid = req.body.studentid;
    let stuArr = req.body.studentid;
    for(i=0 ; i<stuArr.length ; i++){
        studentData[stuArr[i] - 1].mentorid = stuArr[i];
    }
    res.status(200).json({ message : "Mentor Assigned "});
});

app.get('/mentor-student/:id', ( req , res ) =>{
    let id = req.params.id;
    let teacherData = mentor[0];
    res.json(teacherData[id - 1].studentid);
});

app.listen(3000, () => console.log("App is running"));
