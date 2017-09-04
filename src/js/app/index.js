require('less/index.less');

var NoteManager = require('module/note-manager.js').NoteManager;
var Event = require('module/event.js');
var WaterFall = require('module/waterfall.js');
var GoTop = require('module/gotop.js').GoTop;

NoteManager.load();
GoTop($('.gotop')).bindEvent();

$('.add-note').on('mousedown',function() {
    // console.log(this);
    $(this).css({
         'transform': 'translate(2px,2px)'
    })
    NoteManager.add();
})
$('.clear-notes').on('mousedown',function() {
    $(this).css({
        'transform': 'translate(2px,2px)'
    })
    NoteManager.clear();
})
$('.btn-note').on('mouseup',function() {
    $(this).css({
        'transform': 'translate(0,0)'
    })
})
Event.on('waterfall',function() {
    WaterFall.init($('#content'))
})