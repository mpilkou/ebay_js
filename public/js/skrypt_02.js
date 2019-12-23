/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false*/
/*globals $:false*/
'use strict';

$(() => {
    let history = $("#historyTab");

    $.ajax({
        url : "/user/history/",
        data: JSON.stringify({}),
        type: 'POST',
        jsonp: 'jsoncallback',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            let result = JSON.parse(data);

            result.forEach(element => {
                // <div class="text">${element.text}</div>
                history.append(
                    `<li id="${element._id}" class="list-group-item">
                        <div class="left">
                            <div class="name">${element.name}</div>
                        </div>
                        <div class="right">
                            <div class="prise">${element.prise}$</div>
                        </div>
                    </li>`
                );
            });

        },
        error: (XmHtReq, status, error) => {
            console.log(XmHtReq);
            console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
        }
    });

    // let password = $("#inputPassword");
    // let fname = $("#inputFirstName");
    // let lname = $("#inputLastName");

    // let bLogIn = $("#buttonLogIn");
    // let bSignUp = $("#buttonSignUp");
    
    // bSignUp.on("click", function() {
        
    //     $.ajax({
    //         type: 'POST',
    //         url : "/users/login/signup",
    //         data: JSON.stringify(
    //             {
    //                 "fname": fname.val(),
    //                 "sname": lname.val(),
    //                 "email": email.val(),
    //                 "password": password.val()
    //             }
    //         ),
    //         jsonp: 'jsoncallback',
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         // 1
    //         async: false,
    //         // cache: false,
    //         // timeout: 30,
    //         // success: (data) => {
    //         //     console.log("SSSSSSSSSSS");
    //         //     // console.log(data);
                
    //         // },
    //         // error: (XmHtReq, status, error) => {
    //         //     // console.log("SSSSSSSSSSS");
    //         //     console.log(XmHtReq.responseText);
    //         //     console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
    //         // }
    //     });
        
    //     // 2
    //     // alert("Rejestracja zakonczona");
        
    // });
});