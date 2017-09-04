 require('less/gotop.less')

 function goTop($target) {
            
            this.$target = $target
            console.log(this.$target);
            // this.bindEvent();
            // this.target;
            // console.log(target)
          
    }
    goTop.prototype.bindEvent = function() {
        var self = this;
        console.log(self);

        $(window).on('scroll',function() {
            var offsetTop=$(window).scrollTop();
            console.log(offsetTop);
            if(offsetTop > 10 ) {
                self.$target.css({
                     'display': 'block'
                })
            }else {
                self.$target.css({
                     'display':'none'
                })
            }
            self.$target.on('click',function() {
               $("html,body").animate({scrollTop: 0},"slow");
               return false;
        });
    })
}

   

function GoTop($target) {

    return new goTop($target);
}
 module.exports.GoTop = GoTop;

    