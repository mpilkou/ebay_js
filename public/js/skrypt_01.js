/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false*/
/*globals $:false*/
'use strict';

let tab, next;

let pressedNext = function () {
    // console.log($('li').last());
    $.ajax({
        url : "/",
        data: JSON.stringify({params: $('li').last().attr('id')}),
        type: 'POST',
        jsonp: 'jsoncallback',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            let result = JSON.parse(data);
            console.log(result);
            // console.log(result.length);
            if (result.length === 0) {
                $("#next").hide();
            }
            //!!!
            // result.forEach(element => {
            //     tab.append(
            //         `<li id=${element._id} class="list-group-item">
            //             <div class="left">
            //                 <div class="name">${element.name}</div>
            //                 <div class="text"></div>
            
            //             </div>
            //             <div class="right">
            //                 <div class="time"></div>
            //                 <div class="prise">${element.prise}$</div>
            //                 <div class="button">${element.type}</div>
            //             </div>
            //         </li>`);
            // });

            // next.on("click", pressedNext);
            let temp = "";
            let temp1 = "";

            result.forEach(element => {
                console.log(element.type);
                if (element.type === "lot") {
                    temp = '<button type="button" class="myBut lot btn btn-warning">put 5$</button>';
                    temp1 = '<div class="mail"><i class="fas fa-envelope"></i></div>';
                } else if(element.type === "buy") {
                    temp = '<button type="button" class="myBut buy btn btn-primary">Buy it</button>';
                    temp1 = '<div class="mail"><i class="fas fa-envelope"></i></div>';
                }

                tab.append(
                    `<li id=${element._id} class="list-group-item">
                        <div class="left">
                            ${temp1}
                            <div class="name">${element.name}</div>
                            <div class="text"></div>
                        </div>
                        <div class="right">
                            <div class="time">${element.time}</div>
                            <div class="prise">${element.prise}$</div>
                            ${temp}
                        </div>
                    </li>`);
            });
            if (temp !== "") {
                // $("button").each(function (a,b,c) {
                //     console.log(b);
                //     console.log(this);
                // });
                // console.log($(".mail"));

                $(".mail").on("click", pressedMail);
                $(".myBut").on("click", pressedButton);
            }

        },
        error: (XmHtReq, status, error) => {
            console.log(XmHtReq);
            console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
        }
    });
};


let pressedButton = function(a,b,c) {
    // console.log(`${a} + ${b} + ${c}`);
    // console.log(this.parentElement.parentElement);
    let url, 
        itemId = $(this.parentElement.parentElement).attr('id');

    
    if ($(this).hasClass("lot")) {
        url = '/user/getLot';
    } else if($(this).hasClass("buy")) {
        url = '/user/getBuy';
    }

    $.ajax({
        url : url,
        data: JSON.stringify({params: itemId}),
        type: 'POST',
        jsonp: 'jsoncallback',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            window.location.assign("/");
            // console.log("aaassssssssssssss");
            
        //     // console.log("done");
        //     // let result = JSON.parse(data);
        //     // console.log(result);

        //     // result.forEach(element => {
        //     //     tab.append(
        //     //         `<li id=${element._id} class="list-group-item">
        //     //             <div class="left">
        //     //                 <div class="name">${element.name}</div>
        //     //                 <div class="text"></div>
            
        //     //             </div>
        //     //             <div class="right">
        //     //                 <div class="time"></div>
        //     //                 <div class="prise">${element.prise}$</div>
        //     //                 <div class="button">${element.type}</div>
        //     //             </div>
        //     //         </li>`);
        //     // });

        //     // next.on("click", pressedNext);

        //     console.log("aaa");

        },
        error: (XmHtReq, status, error) => {
            console.log(XmHtReq);
            console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
        }
    });
};

let pressedMail = function (params) {
    let idItem = $(this.parentElement.parentElement).attr('id');
    window.location.assign(`/user/mail/${idItem}`);
};

$(() => {

    tab = $("#tableLots");
    next = $("#next");

    $.ajax({
        url : "/",
        data: JSON.stringify({params: 0}),
        type: 'POST',
        jsonp: 'jsoncallback',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            let result = JSON.parse(data);
            let temp = "";
            let temp1 = "";

            result.forEach(element => {
                if (element.type === "lot") {
                    temp = '<button type="button" class="myBut lot btn btn-warning">put 5$</button>';
                    temp1 = '<div class="mail"><i class="fas fa-envelope"></i></div>';
                } else if(element.type === "buy") {
                    temp = '<button type="button" class="myBut buy btn btn-primary">Buy it</button>';
                    temp1 = '<div class="mail"><i class="fas fa-envelope"></i></div>';
                }

                tab.append(
                    `<li id=${element._id} class="list-group-item">
                        <div class="left">
                            ${temp1}
                            <div class="name">${element.name}</div>
                            <div class="text"></div>
                        </div>
                        <div class="right">
                            <div class="time">${element.time}</div>
                            <div class="prise">${element.prise}$</div>
                            ${temp}
                        </div>
                    </li>
                    `);
            });

            if (temp !== "") {
                // $("button").each(function (a,b,c) {
                //     console.log(b);
                //     console.log(this);
                // });
                // console.log($(".mail"));

                $(".mail").on("click", pressedMail);
                $(".myBut").on("click", pressedButton);
            }

            next.on("click", pressedNext);

        },
        error: (XmHtReq, status, error) => {
            console.log(XmHtReq);
            console.log(`xhr: ${XmHtReq}, status: ${status}, err : ${error}`);
        }
    });



    // let table = io(`http://${location.host}/table`);
    // console.log(location.host);
    // console.log(table);
    // // console.log("aaa");
    // table.on('connect', (data) => {
    //     console.log('connect');
    //     table.on('start', (data) => {
    //         console.log(data);
    //         // table.emmit('Astart', {aaa:"aaa"});
    //     });
    //     // table.on('start', (data) => {
    //     //     console.log(data);
    //     // });
    // });
    // table.on('disconnect', () => {
    //     console.log('Zakończone połączenie');
    // });
    // console.log("data");
    





    // let email = $("#inputEmail");
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