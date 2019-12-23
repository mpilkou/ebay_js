/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false*/
/*globals $:false*/
'use strict';

let table;
let ids;

let fun = function(){
    // console.log("data");
    
};
let socket;
$(() => {
    table = io(`http://${location.host}/table`);
    // socket = new io.connect(`${location.host}`);
    // socket.on('connect', function () {
        
    // });

    table.on('connect', (socket) => {
        
    });
    table.on('disconnect', () => {
        console.log('Zakończone połączenie');
    });
    // setTimeout(fun,1000);

    // $.each($('li'), (k,v) => {
    //     console.log(k);
    //     console.log(v);
    // });

    console.log($('#tableLots').children());
    // $( "li" ).each(function( index ) {
    //     console.log( index + ": " + $( this ).text() );
    //   });
    // $( "li" ).each(function( index ) {
    //     console.log( index + ": " + $( this ).text() );
    //   });
    let temp, temp1 = [];
    window.setInterval(() => {
        temp = Array.from($('#tableLots').children());
        if (Array.from(temp).length !== 0) {
            
            temp.forEach(element => {
                temp1.push($(element).attr('id'));
            });
            // console.log(temp1);
            table.emit('refresh', "aaa");
            temp1 = [];
        }
    }, 5000);
});