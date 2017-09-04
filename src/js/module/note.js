require ('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('module/event.js');

function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.setStyle();
    this.bindEvent();
}
Note.prototype = {
    colors: [
        ['#ff9a9a','#ffadad'],  //headercolor contentcolor
        ['#ff6b6b','#ffd3d3'],
        ['#f92525','#ffe6e6'],
        ['#ff1919','#ffc4c4'],
        ['#ff4c4c','#ffa8a8'],
        ['#ff5858','#e79292']
    ],
    defaultOpts: {
        id:'',  //Note的id
        $ct: $('#content').length>0?$('#content'):$('body'),
        contextHtml: 'input here<br><br><br><br><br>'
                     +'<p class="note-token">-------------便签-------------</p>' //Note的内容
    },
    initOpts: function (opts) {
        this.opts = $.extend({},this.defaultOpts,opts||{});
        if(this.opts.id) {
            this.id = this.opts.id;
        }
    },
    createNote: function() {
        var tpl = '<div class="note">'
                 +'<div class="note-head"><span class="delete">&times;</span></div>'
                 +'<div class="note-ct" contenteditable="true">'
                 + '</div>'
                 +'</div>';
        this.$note = $(tpl);
        this.$note .find('.note-ct').html(this.opts.contextHtml);
        this.opts.$ct.append(this.$note);
        if(!this.id) {
            this.$note.css('top','50px'); //新增note的样式
        }
    },
    setStyle: function() {
        var color = this.colors[Math.floor(Math.random()*6)];
        this.$note.find('.note-head').css('background-color',color[0]);
        this.$note.find('.note-ct').css('background-color',color[1])
    },
    setLayout:function () {
        var _this=this;
        if(_this.clk) {
            clearTimeout(_this.clk);
        }
        _this.clk=setTimeout(function() {
            Event.fire('waterfall');
        },100);
    },
    bindEvent: function() {
        var _this=this,
            $note = this.$note,
            $noteHead = $note.find('.note-head'),
            $noteCt = $note.find('.note-ct'),
            $delete = $note.find('.delete');

       

        $delete.on('click',function() {
            _this.delete();
        })
        //contenteditable没有change事件，所以这里做了模拟通过判断元素内容变动，执行save
        $noteCt.on('focus',function() {
            var HTML = 'input here<br><br><br><br><br><p class="note-token">-------------便签-------------</p>';
            var newHTML = '<br><br><br><br><br><br><p class="note-token">-------------便签-------------</p>';
            if($noteCt.html() == HTML) {
                $noteCt.html(newHTML);
            }
            $noteCt.data('before',$noteCt.html());
        }).on('blur paste',function() {
            if($noteCt.data('before') != $noteCt.html()) {
                $noteCt.data('before',$noteCt.html());
                _this.setLayout();
                console.log(_this.id)
                if(_this.id) {
                    _this.edit($noteCt.html())
                }else {
                    _this.add($noteCt.html())
                }
            }

        });

        //设置note的拖动
        $noteHead.on('mousedown',function(e) {
            var evtX=e.pageX-$note.offset().left,//evtX计算事件在出发点在dialog内部到dialog的左边缘的距离
                evtY=e.pageY-$note.offset().top;

          
            $note.addClass('draggable').data('evtPos',{x:evtX,y:evtY});//把事件到dialog边缘的距离保存下来
        }).on('mouseup',function() {
            $note.removeClass('draggable').removeData('pos');
        });

        $('body').on('mousemove',function(e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY-$('.draggable').data('evtPos').y,//当鼠标移动时，根据鼠标的位置和前面保存的距离，计算dialog的绝对位置
                left: e.pageX-$('.draggable').data('evtPos').x
            });
        });
    },

    edit: function(msg) {
        var _this=this;
        $.post('/api/notes/edit',{
            id: this.id,
            note: msg
        }).done(function(ret) {
            if(ret.status === 0) {
                Toast('updata success');
            }else {
                Toast(ret.errorMsg);
            }
        })
    },
    add: function (msg) {
        // console.log('add...');
        var _this=this;
        $.post('/api/notes/add', {note:msg} ).done(function(ret) {
            if(ret.status === 0){
                Toast('add success');
            }else {
                _this.$note.remove();
                Event.fire('waterfall')
                Toast(ret.errorMsg);
            }
        });

    },
    delete:function() {
        var _this=this;
        $.post('/api/notes/delete',{id:this.id}).done(function(ret) {
            if(ret.status === 0) {
                Toast('delete success');
                _this.$note.remove();
                Event.fire('waterfall')
            }else {
                Toast(ret.errorMsg);
            }
        });
    }
};

module.exports.Note = Note;