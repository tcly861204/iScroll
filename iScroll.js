/*
 iScroll 参数
 el:'#iScroll-container',   //父节点ID,必传
 index : 0,
 direction : 'vertical',       //horizontal水平 、vertical垂直
 delay : 500,    //滚动时间间隔
 page : [
 {title:'北京',callback:null}],
 autoplay : false,   //是否自动播放默认不自动
 easing : 'linear',
 keyboard : false
*/

(function(root,factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = root.document ?
            factory( root, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "iScroll requires a window with a document" );
                }
                return factory( w );
            };
    }else if(typeof define === "function" && define.amd ){
        define( "iScroll", [], function() {
            return iScroll;
        });
    }else{
        factory(root);
    }
})(typeof window!=='undefined' ? window : this , function(root){
    if(!String.prototype.trim){
        String.prototype.trim = function(){
            return this.replace(/^(\s*)|(\s*)$/g,'');
        }
    }
    function Tools(opts){
        this.init(opts);
    }
    Tools.prototype = {
        constructor:Tools,
        init:function(opts){
            var obj = scrollContainer = this.getId(opts.el),
                scrollBox = this.getClass('iScroll-scrollbox',obj),
                items = this.getClass('iScroll-item',obj);

            if(items.length){
                var len = items.length,
                    iNow = 0,
                    timer = null,
                    speed = 10,
                    iMove = 0,
                    that = this,
                    itemHeight = parseInt(this.getStyle(obj,'height'),'10');
                // scrollBox.style.height = itemHeight*len+'px';
                scrollBox.style.transform = 'translateY(-'+itemHeight*iMove+'px)';
                clearInterval(timer);
                timer = setInterval(function(){
                    that.removeClass(items[iMove],'active');
                    iMove++;
                    if(iMove>=len){
                        iMove = 0;
                    }
                    that.addClass(items[iMove],'active');
                    scrollBox.style.transform = "translateY(-"+itemHeight*iMove+"px)";
                    scrollBox.style.transition = 'transform 2s';
                    scrollBox.style.WebkitTransform = "translateY(-"+itemHeight*iMove+"px)";
                },opts.delay);
            }
        },
        getId:function(id){
            return document.querySelector(id) || document.getElementById(id.substring(1))
        },
        hasClass:function(node,cls){
            var re = new RegExp('\\b'+cls+'\\b'),flag = false;
            if(re.test(node.className)){
                flag = true;
            }
            return flag;
        },
        getClass:function(className,preNode){
            var pre = preNode || document,
                tags = pre.getElementsByTagName('*'),
                arr=[];
            for(var i=0;i<tags.length;i++){
                if(this.hasClass(tags[i],className)){
                    arr.push(tags[i]);
                }
            }
            return arr.length===1 ? arr[0] : arr;
        },
        addClass : function(node,cls){
            if(!this.hasClass(node,cls)){
                node.className +=' '+cls;
                node.className = node.className.trim();
            }
        },
        removeClass:function(node,cls){  //移除css
            var re = new RegExp('\\b'+cls+'\\b');
            if(this.hasClass(node,cls)){
                node.className = node.className.replace(re,'').replace(/\s{2}/g,' ').trim();
            }
        },
        getStyle:function(node,key){   //  获取css
            if(node.currentStyle){
                return node.currentStyle[key];
            }else{
                return window.getComputedStyle(node,null)[key];
            }
        },
        addEvent:function(node,type,handler){  //事件绑定
            if(node.addEventListener){
                node.addEventListener(type,handler,false);
            }else if(node.attachEvent){
                node.attachEvent('on'+type,function(){
                    handler.call(node);
                });
            }
        }
    };
    function Scorll(opts){
        if(!opts
            || typeof opts==='undefined'
            || !opts.hasOwnProperty('el')
            || typeof opts.el!=='string'
            || opts.el.charAt(0)!=='#'){
            return;
        }
        this.init =  {
            el:null,
            index : 0,
            direction : 'vertical',       //horizontal水平 、vertical垂直
            delay : 3000,    //滚动时间间隔
            page : [],
            autoPlay : false,   //是否自动播放默认不自动
            easing : 'linear',    //
            keyBoard : false   //
        };
        for(var i in opts){
            if(this.init.hasOwnProperty(i)){
                this.init[i] = opts[i];
            }
        }
        new Tools(this.init);
    }

    root.iScroll = function(opts){
        return new Scorll(opts);
    }
});