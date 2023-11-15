const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require('dotenv').config();
// var pool = mysql.createConnection({
//   host: "localhost",
//   port:'3307',
//   user: "root",
//   password: "jainams0703@h",
//   database: "ssip",
//   insecureAuth: true,
// });
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  port:process.env.port,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  insecureAuth: true,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
});
// var pool = mysql.createPool({
//   host: "buvlyychyhv0fzgxfbd6-mysql.services.clever-cloud.com",
 
//   user: "ulcggsx2b1cubz6m",
//   password: "tqUogiSfpZUEtKtoh8Tm",
//   database:"buvlyychyhv0fzgxfbd6",
//   insecureAuth: true,

//   waitForConnections:true,
//   connectionLimit:10,
//   queueLimit:0
// });

pool.getConnection((err,conn)=>{
    if (err) throw err;
    console.log("Connected!");
  })
  
  // pool.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });
  
  app.get("/", (req, res) => {
    res.redirect("/employee/test");
  });
  app.get("/employee/login", (req, res) => {
    res.sendFile(__dirname + "/public/pages/employee/login.html");
  });
  app.get("/employee/signin", (req, res) => {
    // pool.query("select * from department_names", (error, results) => {
      //   if (!error) {
        //     function j() {
          //       return results;
  //     }
  //     app.get("/employee/signin1", (req, res) => {
    //       results = j();
    //       res.send(results);
    //     });
    //   }
    
    res.sendFile(__dirname + "/public/pages/employee/signin.html");
  });
  
  
  app.post("/employee/trainning_name",(req,res)=>{
    let {lw}=req.body
    if(lw){
      
      pool.query('select  tp_name  from training_programm where tp_subject=(?) ',[lw],(error,result)=>{
        if(!error){
          res.send(result)
          
        }
      }  )
      
    }
    
    
  })
  
  
  app.post("/employee/subject",(req,res)=>{
  let {lw}=req.body;
  if(lw){
  
    pool.query('select distinct tp_subject  from training_programm where spipa_location=(?) ',[lw],(error,result)=>{
      if(!error){
        res.send(result)
      }
    }  )
    
  }
  app.post("/employee/date",(req,res)=>{
    console.log(req.body)
    let {lw,val1,val3}=req.body
    
    if(lw && val1  && val3){
      pool.query("select tp_start_date,tp_ending_date from training_programm where tp_name=(?) and spipa_location=(?) and tp_subject=(?) ",[lw,val1,val3],(error,result)=>{
        if(!error){
          res.send(result)
        }
      })
    }
 
  })


  })
  app.get("/employee/options",(req,res)=>{
    pool.query("select * from department_names",(error, results) => {
      if (!error) {
      k=JSON.stringify(results)
     console.log(results);
      res.json({results1:results})
      
     
    }
})
// res.send("hello");
}
)






app.get("/employee/test", (req, res) => {
  res.sendFile(__dirname + "/public/pages/employee/test.html");
});
app.get("/employee", (req, res) => {
  res.sendFile(__dirname + "/public/pages/employee/employee.html");
});
app.get("/employee/req", (req, res) => {
  res.sendFile(__dirname + "/public/pages/employee/Req-apply/index.html");
});

app.get("/emp-training", (req, res) => {
  const current_user = 1;
  pool.query(
    "SELECT * FROM emp_training where emp_id=(?)",
    [current_user],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving company");
      } else {
        res.status(200).json(results);
      }
    }
  );
});
app.get("/emp-exam", (req, res) => {
  const current_user = 1;
  pool.query(
    "SELECT * FROM emp_exam where emp_id=(?)",
    [current_user],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving company");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/department/login", (req, res) => {
  res.sendFile(__dirname + "/public/pages/department/login.html");
});
app.get("/department/signin", (req, res) => {
  res.sendFile(__dirname + "/public/pages/department/signin.html");
});
app.get("/department/test", (req, res) => {
  res.sendFile(__dirname + "/public/pages/department/test.html");
});
app.get("/department", (req, res) => {
  res.sendFile(__dirname + "/public/pages/department/department.html");
});

app.get("/spipa/login", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/login.html");
});
app.get("/spipa/signin", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/signin.html");
});
app.get("/spipa/test", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/test.html");
});
app.get("/spipa", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/spipa.html");
});
app.get("/spipa/add-quiz", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/addQuiz.html");
});
app.post("/spipa/add-quiz", (req, res) => {
  console.log(req.body)
  if(req.body.constructor === Object && Object.keys(req.body).length !== 0){

    let {question_title,optionA,optionB,optionC,optionD,question_answer,question_domain}=req.body;
    let subjects=["Apno Taluko Vibrant Taluko","Budget","Climate Change","Departmental Inquiry Procedures","Development Communications","Interpersonal Relationships"
    ,"Office Procedures","Stress Management","Team Building & Motivation","Training on Behavioral Aspects","	Planning Effective Implementation of MGNREGA",
"Retirement Benefits for Government Employees"]
 
 let answer=0;
 let index=subjects.indexOf(question_domain)
 if(question_answer=='a')answer=0;
 else if(question_answer=='b')answer=1;
 else if(question_answer=='c')answer=2;
 else if(question_answer=='d')answer=3;
  
  pool.query(
    "INSERT INTO emp_questions VALUES (?, ?, ?, ?, ?, ?,?)",
    [
      question_title,
      optionA,
      optionB,
      optionC,
      optionD,
      index,
      answer
    ]
    );
  }
    res.status(200).send("submited")
  
});

app.get("/spipa/get_quiz",(req,res)=>{
  pool.query("select * from emp_questions",(error,result)=>{
if(!error){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  res.send(result)
}
  })
})

app.get("/spipa/addDepartment", (req, res) => {
  res.sendFile(__dirname + "/public/pages/spipa/addDepartment.html");
});

app.post("/employee/signin", (req, res) => {
  const employeeDetail = {
    name: req.body.emp_name,
    email: req.body.emp_email,
    phoneNumber: req.body.emp_pn,
    department: req.body.emp_department,
    pass: req.body.emp_pass,
    bDate: req.body.emp_bDate,
    gender: req.body.emp_gender,
  };

  pool.query(
    "INSERT INTO employee (name, email_id, phone_no ,dept_name," +
      "password,birth_date ,gender) VALUES (?, ?, ?, ?, ?, ?,?)",
    [
      employeeDetail.name,
      employeeDetail.email,
      employeeDetail.phoneNumber,
      employeeDetail.department,
      employeeDetail.pass,
      employeeDetail.bDate,
      employeeDetail.gender,
    ]
  );
  pool.query(
    "SELECT emp_id FROM employee where email_id=(?)",
    [employeeDetail.email],
    (error, results) => {
      console.log(results[0].emp_id);

      async function send(to_mail, message, subject) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "jainamsanghavi008@gmail.com",
            pass: "wmcnnvjipuyqawpf",
          },
        });
        const mailoptions = {
          from: "jainamsanghavi008@gmail.com",
          to: to_mail,
          text: message,
          subject: subject,
        };
        try {
          const result = await transporter.sendMail(mailoptions);
          console.log("success");
        } catch (error) {
          console.log("error");
        }
      }
      send(
        employeeDetail.email,
        `Hello ,${employeeDetail.name}
    Your User id:${results[0].emp_id}
    Password:${employeeDetail.pass}
    Thanks For registration.
    `,
        "Email confirmation + user id and password"
      );
    }
  );
  res.redirect("/employee/login");
});

app.post("/employee/login", (req, res) => {
  const { login_id, login_password } = req.body;
  const userId = req.body.login_id;
  const userPassword = req.body.login_password;
  var dataPassword = 0;
  pool.query(
    "SELECT password FROM employee where emp_id=(?)",
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json(results[0].password);
      }
    }
  );
});

app.post("/employee/test", (req, res) => {
  const { getUser, getPass } = req.body;
  const cookieUser = req.body.getUser;
  const cookiePass = req.body.getPass;

  if (cookieUser != " ") {
    res.status(200).json(1);
  } else {
    res.status(200).json(0);
  }
});

app.post("/employee/req", (req, res) => {
  console.log( req.body);
  let {getUser,center,city,subject,training,starting_date,ending_date}=req.body;
  // console.log(getUser,center,city,subject,training,starting_date,ending_date)
if(getUser && center && city && subject && training && starting_date && ending_date){
  pool.query("select name from employee where emp_id=(?)",[getUser],(error,result)=>{
    if(!error){
      console.log(result[0].name ,"result")
      pool.query(
        "INSERT INTO emp_training_req (emp_id,emp_name,emp_training, emp_start_date,emp_ending_date,emp_training_subject,spipa_location) VALUES (?,?, ?, ?, ?,?,?)",
        [
          getUser,
          result[0].name,
          training,
          starting_date,
          ending_date,
          subject,
          city

        ]
      );
    }
  })
}
  console.log("success");
});

//For Department

app.post("/department/signin", (req, res) => {
  const employeeDetail = {
    name: req.body.dept_emp_name,
    email: req.body.dept_emp_email,
    department: req.body.dept_name,
    pass: req.body.dept_emp_pass,
    role: req.body.dept_role,
  };

  pool.query(
    "INSERT INTO department_emp (dept_emp_name, dept_emp_email,dept_name," +
      "dept_emp_pass ,dept_role) VALUES (?, ?, ?, ?, ?)",
    [
      employeeDetail.name,
      employeeDetail.email,
      employeeDetail.department,
      employeeDetail.pass,
      employeeDetail.role,
    ]
  );
  res.redirect("/department/login");
});

app.post("/department/login", (req, res) => {
  const { login_id, login_password } = req.body;
  const userId = req.body.login_id;
  const userPassword = req.body.login_password;
  var dataPassword = 0;
  pool.query(
    "SELECT dept_emp_pass FROM department_emp where dept_emp_id=(?)",
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json(results[0].dept_emp_pass);
      }
    }
  );
});

app.post("/department/test", (req, res) => {
  const { getUser, getPass } = req.body;
  const cookieUser = req.body.getUser;
  const cookiePass = req.body.getPass;

  if (cookieUser != " ") {
    res.status(200).json(1);
  } else {
    res.status(200).json(0);
  }
});

//For spipa

app.post("/spipa/signin", (req, res) => {
  const employeeDetail = {
    name: req.body.spipa_emp_name,
    email: req.body.spipa_emp_email,
    center: req.body.spipa_center_name,
    pass: req.body.spipa_emp_pass,
  };

  pool.query(
    "INSERT INTO spipa_emp (user_name, user_email,spipa_center," +
      "password) VALUES (?, ?, ?, ?)",
    [
      employeeDetail.name,
      employeeDetail.email,
      employeeDetail.center,
      employeeDetail.pass,
    ]
  );
  res.redirect("/spipa/login");
});

app.post("/spipa/login", (req, res) => {
  const { login_id, login_password } = req.body;
  const userId = req.body.login_id;
  const userPassword = req.body.login_password;
  pool.query(
    "SELECT password FROM spipa_emp where user_id=(?)",
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json(results[0].password);
      }
    }
  );
});

app.post("/spipa/test", (req, res) => {
  const { getUser, getPass } = req.body;
  const cookieUser = req.body.getUser;
  const cookiePass = req.body.getPass;

  if (cookieUser != " ") {
    res.status(200).json(1);
  } else {
    res.status(200).json(0);
  }
});

app.post("/spipa/addDepartment", (req, res) => {
  const dept_name = req.body.dept_name;
  pool.query(`Insert into department_names values('${dept_name}')`);
  console.log(dept_name);
  res.status(200).json(1);
});

const PORT= 3000;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
app.get("/reject/:id", (req, res) => {
  const req_Id = req.params.id;
  console.log(req_Id);
  pool.query(
    "DELETE FROM emp_training_req WHERE req_id=(?);",
    [req_Id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving company");
      } else {
        console.log("deleted");
        res.status(200).json(results);
      }
    }
  );
});
app.get("/accept/:id", (req, res) => {
  const req_Id = req.params.id;
  console.log(req_Id);
  pool.query(
    "select * FROM emp_training_req WHERE req_id=(?);",
    [req_Id],
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        var emp = {
          req_id: results[0].req_id,
          emp_id: results[0].emp_id,
          emp_name: results[0].emp_name,
          emp_training: results[0].emp_training,
          emp_start_date: results[0].emp_start_date,
          emp_ending_date: results[0].emp_ending_date,
        };

        pool.query(
          "INSERT INTO spipa_training_req (req_id,emp_id,emp_name, emp_training, emp_start_date," +
            "emp_ending_date) VALUES (?, ?, ?, ?, ?,?)",
          [
            emp.req_id,
            emp.emp_id,
            emp.emp_name,
            emp.emp_training,
            emp.emp_start_date,
            emp.emp_ending_date,
          ],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error insert");
            } else {
              res.status(200).send("added in spipa training");
            }
          }
        );
      }
    }
  );
  pool.query(
    "DELETE FROM emp_training_req WHERE req_id=(?);",
    [req_Id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving company");
      } else {
        console.log("deleted");
        res.status(200).json(results);
      }
    }
  );
});
app.get("/all/emp-training", (req, res) => {
  pool.query("SELECT * FROM emp_training", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving company");
    } else {
      res.status(200).json(results);
    }
  });
});
app.get("/all/emp-exam", (req, res) => {
  const current_user = 1;
  pool.query("SELECT * FROM emp_exam ", [current_user], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving company");
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/emp-training-req', (req, res) => {
  const current_user = 1;
  pool.query('SELECT * FROM emp_training_req', (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving company');
      } else {
          res.status(200).json(results);
      }
    });
});