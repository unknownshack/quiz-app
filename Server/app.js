var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var RegisterUsersRouter = require('./routes/Insertusers');
var testAPIRouter = require("./routes/testAPI");
var loginRouter = require("./routes/login");
var createQuiz = require("./routes/createQuiz");
var getQuestion = require("./routes/getQuestion");
var getResult = require("./routes/getResult");
var uploadAnswer = require("./routes/uploadAnswer");
var app = express();

var User = require('./models/user.js');
var Quiz = require('./models/quiz.js');
var Question = require('./models/question.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/RegisterUsers', RegisterUsersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/login", loginRouter);
app.use("/createQuiz", createQuiz);
app.use("/getQuestion", getQuestion);
app.use("/uploadAnswer", uploadAnswer);
app.use("/getResult", getResult);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//mongodb connection, see mongodb collections in the Server/models folder
var mongoose = require('mongoose')
var mongoose2 = require('mongoose');
const question = require('./models/question.js');
//var url = "mongodb+srv://Henan:cecilia1996@ppc.x8ose.mongodb.net/UserDB?retryWrites=true&w=majority";
//var url = "mongodb+srv://mettle:w2k_pass@ppc.ncydd.mongodb.net/myCollections?retryWrites=true&w=majority";
var url = 'mongodb://127.0.0.1:27017/mettleDB'; //not using local mongodb service
var url2 = 'mongodb://127.0.0.1:27017/test'; //not using local mongodb service


const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
};

mongoose.connect(url, options).then(
  () => { console.log("mongoDB connected"); },
  err => { console.log(err); }
);

const readDbConnection = mongoose.connection

readDbConnection.on('error', err => {
  console.error('connection error:', err)
})


readDbConnection.once('open', async () => {
  console.log('Connected to read database');

  // Read and save User documents
  const users = await User.find({}).exec();
  const quizzes = await Quiz.find({}).exec();
  const questions = await Question.find({}).exec();

  readDbConnection.close();
  mongoose2.connect(url2, options).then(
    () => { console.log("mongoDB connected"); },
    err => { console.log(err); }
  );

  const writeDbConnection = mongoose2.connection
  writeDbConnection.once('open', async () => {

    // Save User documents to the write database
    for (const user of users) {
      const newUser = new User({
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        callback: user.callback,
      });

      try {
        await newUser.save();
        //savedUsers.push(savedUser);
        console.log('User saved to write database:');
      } catch (err) {
        console.error('Error saving user to write database:', err);
      }
    }

    for (const quiz of quizzes) {
      const newQuiz = new Quiz({
        _id: quiz._id,
        userID: quiz.userID,
        Date: quiz.Date,
        questionList: quiz.questionList,
        answers: quiz.answers,
        score: quiz.score,
        // Map other fields as needed
      });
      try {
        const savedQuiz = await newQuiz.save();
        console.log('Quiz saved to write database:', savedQuiz);
      } catch (err) {
        console.error('Error saving quiz to write database:', err);
      }
    }

    for (const question of questions) {
      const newQuestion = new Question({
        questionID: question.questionID,
        questionText: question.questionText,
        questionType: question.questionType,
        isMultipleChoice: question.isMultipleChoice,
        isVocalQuestion: question.isVocalQuestion,
        isForcedAnswer: question.isForcedAnswer,
        isShortAnswer: question.isShortAnswer,
        isDrawingQuestion: question.isDrawingQuestion,
        answers: question.answers.map((answer) => ({
          answerText: answer.answerText,
          answerImg: answer.answerImg,
          isCorrect: answer.isCorrect,
        }))
      }
      );
      try {
        const savedQuestion = await newQuestion.save();
        console.log('Quiz saved to write database:', savedQuestion);
      } catch (err) {
        console.error('Error saving quiz to write database:', err);
      }
    }


  });
  // Disconnect from the read database and proceed to the next model
});




module.exports = app;
