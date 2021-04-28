const express = require("express");
const app = express();
const server = require('http').Server(app);
const appPort = process.env.PORT || 3000;
var mysql = require('mysql');
var request = require('request');
const path = require('path');
var jwt = require('jsonwebtoken');
var auth = require('./lib/auth');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'fintech'
});
connection.connect();

app.post('/authTest', auth, function (req, res) {
  res.json(req.decoded);
})

app.post('/api/signup', (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var access_token = req.body.access_token;
  var refresh_token = req.body.refresh_token;
  var user_seqnum = req.body.user_seqnum;
  console.log(name, phone, email, password, access_token, refresh_token, user_seqnum);
  var sql = "UPDATE user SET email=?, password=?, access_token=?, refresh_token=?, user_seqnum=? WHERE phone=?";
  connection.query(sql, [email, password, phone, access_token, refresh_token, user_seqnum], function (err, result) {
    if (err) {
      console.error(err);
      res.json(0); // 회원가입 실패
      throw err;
    }
    else {
      res.json(1) // 회원가입 성공
    }
  })
})

app.post('/api/signin', function (req, res) {
  var email = req.body.email;
  var prassword = req.body.password;
  console.log(email, password)
  var sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [email], function (err, result) {
    if (err) {
      console.error(err);
      res.json(0);
      throw err;
    }
    else {
      console.log(result);
      if (result.length == 0) {
        res.json(3) // 이메일 없음
      }
      else {
        var dbPassword = result[0].password;
        if (dbPassword == password) {
          var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%"
          jwt.sign(
            {
              userId: result[0].user_id,
              userEmail: result[0].email
            },
            tokenKey,
            {
              expiresIn: '10d',
              issuer: 'fintech.admin',
              subject: 'user.login.info'
            },
            function (err, token) {
              console.log(token)
              res.json(token) // 로그인 성공 -> sessionStorage에 token 저장
            }
          )
        }
        else {
          res.json(2); // 패스워드 틀림
        }
      }
    }
  })
})

// app.post('/account', auth, function (req, res) {
//   var user_id = req.decoded.userId;

//   var sql = "SELECT * FROM user WHERE user_id=?"
//   connection.query(sql, [user_id], function (err, result) {
//     if (err) {
//       console.error(err);
//       throw err;
//     }
//     else {
//       console.log(result);
//       var option = {
//         method: "GET",
//         url: "https://openapi.openbanking.or.kr/v2.0/account/list",
//         headers: {
//           //Authorization: 'Bearer ' + result[0].access_token,
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzcwMjAxIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MjczNjE4MTksImp0aSI6ImRiOWMwZmNhLWRhNTEtNGNkZC1iZTU5LTgwMjk2MDBlNDNkNSJ9._gVvQpd3f_ayFjvdvsEhgKyX_IrRU751vbLh6r42Zho',
//         },
//         qs: {
//           //user_seq_no: result[0].user_seqnum,
//           user_seq_no: 1100770201,
//           include_cancel_yn: 'Y',
//           sort_order: 'D'
//         }
//       }
//       request(option, function (err, response, body) {
//         if (err) {
//           console.error(err);
//           throw err;
//         }
//         else {
//           console.log(body);
//         }
//       })
//     }
//   })
// })

app.listen(appPort, function () {
  console.log(`********** EXPRESS SERVER is running on port ${appPort} **********`);
})