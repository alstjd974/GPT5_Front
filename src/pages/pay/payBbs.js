import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

function PayBbs() {
  const [paymentlist, setPaymentlist] = useState([]);
  const [nickname, setNickname] = useState("");
  const history = useNavigate();
  const fetchData = async () => {
    await axios
      .post("http://localhost:3000/getPaymentBbs", null, {
        params: { nickname: nickname },
      })
      .then(function (resp) {
        console.log(resp.data.list);
        setPaymentlist(resp.data.list);
      })
      .catch(function (err) {
        alert(err);
      });
  };

  useEffect(
    () => {

      const user = JSON.parse(localStorage.getItem("login"));

      if (user !== undefined && user !== null) {
        console.log(user.nickname);
        setNickname(user.nickname);
        fetchData();
      } else {
        alert("로그인 해주십시오.");
        history("/login");
      }
    },
    [],
    [fetchData]
  );

  return (
    <>
      <Header />
      <div align="center">
        <h1>list</h1>
        <br />

        <div>
          <table border="1">
            <colgroup>
              <col width="70" />
              <col width="100" />
              <col width="600" />
              <col width="100" />
              <col width="100" />
            </colgroup>

            <thead>
              <tr>
                <th>번호</th>
                <th>회원</th>
                <th>주문 ID</th>
                <th>충전 액수</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {paymentlist.map(function (bbs, i) {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td align="left">{bbs.nickname}</td>
                    <td>{bbs.orderid}</td>
                    <td>{bbs.amount}</td>
                    <td>{bbs.wdate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <br />
    </>
  );
}

export default PayBbs;