const express = require('express'),
      morgan = require('morgan'),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser');

var app = express(),
    transporter = nodemailer.createTransport(
      'smtps://' + process.env.PERSONAL_WEBSITE_EMAIL_ADDRESS + ':' +
      process.env.PERSONAL_WEBSITE_EMAIL_PASSWORD + '@smtp.gmail.com'
    );

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
  // response.render('index');
});

app.get('/contact', (request, response) => {
  response.render('contact');
});

app.post('/send-email', (request, response) => {
  console.log('HTTP Request body was:');
  console.log(request.body);

  transporter.sendMail({
    from: '"' + request.body.name + '👥"<' + request.body.email +'>',
    to: 'jessicamaryleach@gmail.com',
    subject: 'Email received from Personal Website',
    text: request.body.content + '\n Reference Email of the sender is: ' +
    request.body.email  + '\n Reference Full Name of the sender is: ' + request.body.name,
  }, (error, info) => {
    if (error) {
    return console.log(error);
    }

  console.log('Message sent: ' + info.response);
});

response.redirect('/');
});

app.listen(3000, () => {
  console.log('Web server started on port 3000');
});
