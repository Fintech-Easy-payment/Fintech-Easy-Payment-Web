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

var connection;

// if (process.env.NODE_ENV == 'production') {
var db_config = {
  host: 'us-cdbr-east-03.cleardb.com',
  post: 3306,
  user: 'bc44916151566b',
  password: '9c011805',
  database: 'heroku_2fef9e1d5161af5'
}
connection = mysql.createPool(db_config);


// else {
//   var db_config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'fintech'
//   }
//   connection = mysql.createConnection(db_config);
// }

app.use(express.static(path.join(__dirname, '../front-end/dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front-end/dist/index.html'))
})

app.get('/payment', function (req, res) {
  res.sendFile(path.join(__dirname, '../front-end/dist/index.html'))
})

app.post('/authTest', auth, function (req, res) {
  res.json(req.decoded);
})

app.post('/api/signup', (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  console.log('회원가입 성공');
  console.log(name, phone, email, password);
  var sql = "UPDATE user SET email=?, password=? WHERE phone=?";
  connection.query(sql, [email, password, phone], function (err, result) {
    if (err) {
      res.json(0); // 회원가입 실패
    }
    else {
      var sql = "SELECT * from user WHERE phone=?"
      connection.query(sql, [phone], function (err, result) {
        if (!result[0]) {
          res.json(0); // 회원가입 실패
        }
        else {
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
              console.log('로그인 토큰 발행')
              console.log(token)
              res.json(token) // 로그인 성공 -> sessionStorage에 token 저장
            }
          )
        }
      })
    }
  })
})

app.post('/api/token', auth, (req, res) => {
  var user_id = req.decoded.userId;
  var code = req.body.code;
  var option = {
    method: "POST",
    url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      code: code,
      client_id: '89358db6-c434-40fe-9ae2-a2254dc1506a',
      client_secret: '4ada8450-c969-4af7-b622-c605f341f7d6',
      redirect_uri: 'https://finextend.herokuapp.com/authResult',
      grant_type: 'authorization_code'
    }
  }
  request(option, function (err, response, body) {
    if (err) {
      console.error(err);
      throw err;
    }
    else {
      var requestResult = JSON.parse(body);
      console.log(requestResult);
      var access_token = requestResult.access_token;
      var refresh_token = requestResult.refresh_token;
      var user_seqnum = requestResult.user_seq_no;
      var sql = "UPDATE user SET access_token=?, refresh_token=?, user_seqnum=? WHERE user_id=?";
      connection.query(sql, [access_token, refresh_token, user_seqnum, user_id], function (err, result) {
        if (err) {
          console.error(err);
          res.json(0); // 인증 실패
          throw err;
        }
        else {
          res.json(1) // 인증 성공
        }
      })
    }
  })
})

app.post('/api/signin', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [email], function (err, result) {
    if (err) {
      console.error(err);
      res.json(0);
      throw err;
    }
    else {
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
              console.log('로그인 토큰 발행')
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

app.post('/api/account', auth, function (req, res) {
  var user_id = req.decoded.userId;

  var sql = "SELECT * FROM user WHERE user_id=?"
  connection.query(sql, [user_id], function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    }
    else {
      var option = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/list",
        headers: {
          Authorization: 'Bearer ' + result[0].access_token
        },
        qs: {
          user_seq_no: result[0].user_seqnum,
          include_cancel_yn: 'Y',
          sort_order: 'D'
        }
      }
      request(option, function (err, response, body) {
        if (err) {
          console.error(err);
          throw err;
        }
        else {
          var requestResult = JSON.parse(body);
          var res_list = requestResult.res_list;
          var account_result = new Object();
          account_result.account_list = []

          console.log('계좌 리스트')
          console.log(res_list)
          for (i = 0; i < res_list.length; i++) {
            res_one = res_list[i]
            account_result.account_list.push({
              fintech_use_num: res_one.fintech_use_num,
              bank_name: res_one.bank_name,
              account_num_masked: res_one.account_num_masked
            })
          }

          var sql = "SELECT * FROM user_product up join product p on up.product_id = p.product_id WHERE user_id=?"
          connection.query(sql, [user_id], function (err, result) {
            if (err) {
              console.error(err);
              throw err;
            }
            else {
              account_result.product_id = result[0].product_id;
              account_result.product_name = result[0].product_name;
              account_result.product_price = result[0].price;
              res.json(account_result);
            }
          })
        }
      })
    }
  })
})

app.post('/api/withdraw', auth, function (req, res) {
  // fin 넘버 , 출금 계좌 , 금액 , 
  var userId = req.decoded.userId;
  var fin_use_num = req.body.fin_use_num;
  var price = req.body.price;
  var productId = req.body.product_id;
  console.log(req.body)


  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  var transId = "M202111589" + 'U' + countnum; // 이용기관번호 본인것 입력
  
  function pad2(n) { return n < 10 ? '0' + n : n }
  var date = new Date();
  var sdate = date.getFullYear().toString() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate())
  var edate = date.getFullYear().toString() + '-' + pad2(date.getMonth() + 2) + '-' + pad2(date.getDate())

  var sql = "SELECT * FROM user WHERE user_id = ?"
  connection.query(sql, [userId], function (err, result) {
    if (err) {
      console.error(err);
      throw err
    }
    else {
      var option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
        headers: {
          Authorization: 'Bearer ' + result[0].access_token,
          "Content-Type": "application/json"
        },
        json: {
          "bank_tran_id": transId,
          "cntr_account_type": "N",
          "cntr_account_num": "100000000001",
          "dps_print_content": "이용권연장",
          "fintech_use_num": fin_use_num, 
          "wd_print_content": "이용권연장",
          "tran_amt": price,
          "tran_dtime": date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds()),//"20200424131111",
          "req_client_name": "홍길동",
          "req_client_fintech_use_num" : fin_use_num,
          "req_client_num": "HONGGILDONG1234",
          "transfer_purpose": "TR",
          "recv_client_name": "한지예",
          "recv_client_bank_code": "097",
          "recv_client_account_num": "100000000001"
        }
      }
      request(option, function (err, response, body) {
        if (err) {
          console.error(err);
          res.json(0); // API 에러
        }
        else {
          console.log(body);
          var sql = "INSERT INTO user_product (user_id, product_id, start_date, exr_date) VALUES (?,?,?,?)"
          connection.query(sql, [userId, productId, sdate, edate], function (err, result) {
            if (err) {
              console.error(err);
              res.json(1) // DB에 데이터 삽입이 안됐을 때
            }
            else {
              res.json(2) // 출금 성공
            }
          })
        }
      })
    }
  })
})

app.listen(appPort, function () {
  console.log(`********** EXPRESS SERVER is running on port ${appPort} **********`);
})