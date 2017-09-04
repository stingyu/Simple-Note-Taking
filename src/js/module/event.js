var EventCenter = (function() {
    var events = {};

    function on(evt,handler) {
        events[evt] = events[evt] || [];

        events[evt].push( {
            handler:handler
        });
    }

    function fire(evt,args) {
        if(!events[evt]) {
            return;
        }
        for(var i=0;i<events[evt].length;i++) {
            events[evt][i].handler(args);
        }
    }

    return {
    on:on,
    fire:fire
    }
})();

module.exports = EventCenter;



// EventCenter.on('text-change',function(data) {
//     console.log(data);
// });//当监听到text-change事件时，执行handler函数。

// EventCenter.on('text-change',function(data) {
//     alert(1);
// });

// EventCenter.fire('text-change',100)  //当在text-cahange焦点上时，执行handler(100)