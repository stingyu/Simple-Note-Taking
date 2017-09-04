require('less/toast.less')
// var $=require('jquery')
function toast(tips, time) {
    this.tips = tips;
    this.dismissTime = time||1000;
    this.createToast();
    this.showToast();
}
toast.prototype = {
    createToast:function() {
        var tpl = '<div class="toast">'+this.tips+'</div>';
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast:function() {
        var _this=this;
        this.$toast.fadeIn(300,function() {
            setTimeout(function() {
                _this.$toast.fadeOut(300,function() {
                    _this.$toast.remove();
                });
            },_this.dismissTime);
        });
    }
};
function Toast(tips,time) {
    return new toast(tips,time);
}

module.exports.Toast = Toast;