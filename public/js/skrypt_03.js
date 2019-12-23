/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false*/
/*globals $:false*/
'use strict';

let ansverFun = function (){

    window.location.assign(`/user/ansver/${$(this.parentElement.parentElement).attr('id')}`);

    // console.log($(this.parentElement.parentElement).attr('id'));

    // $.ajax({
    //     url : "/user/messages/",
    //     data: JSON.stringify({}),
    //     type: 'POST',
    //     jsonp: 'jsoncallback',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     success: (data) => {
    //         let result = JSON.parse(data);


    //     },
    //     error: (XmHtReq, status, error) => {
    //         console.log(XmHtReq);
    //         console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
    //     }
    // });
};

$(() => {
    
    let messagesTab = $("#messagesTab");

    $.ajax({
        url : "/user/messages/",
        data: JSON.stringify({}),
        type: 'POST',
        jsonp: 'jsoncallback',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            let result = JSON.parse(data);

            // console.log(result);
            result.params.messages.forEach(element => {
                messagesTab.append(
                    `<li id="${element.from}" class="list-group-item">
                        <div class="left">
                            <div class="text">${element.fromName}</div>
                        </div>
                        <div class="right">
                            <div class="text">${element.text}</div>
                            <button class="myAnsver btn btn-primary">Send ansver</button>
                        </div>
                    </li>`
                );
            });

            $(".myAnsver").on("click", ansverFun);

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