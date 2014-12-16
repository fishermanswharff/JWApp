"use strict";angular.module("MainController",[]),angular.module("MainDirective",[]),angular.module("jwwebApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","MainController","MainDirective"]).run(["$rootScope","$location","$http","$window","AuthFactory","PostsFactory","CategoryFactory",function(a,b,c,d,e,f,g){a.$on("$routeChangeStart",function(a,b){console.log(a,b),e.isAuthenticated()&&(c.defaults.headers.common.Authorization="Token token="+d.sessionStorage.getItem("jw-token")),$("nav.navbar").removeClass("active"),$("a#menu-icon").removeClass("active"),f.fetch(),g.fetch()})}]),angular.module("jwwebApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController"}).when("/posts/:postId",{templateUrl:"views/post.html",controller:"PostViewController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutController"}).when("/login",{templateUrl:"views/login.html",controller:"LoginController"}).when("/new-post",{templateUrl:"views/newPost.html",controller:"NewPostController"}).when("/image-uploader",{templateUrl:"views/image-uploader.html",controller:"ImageUploader"}).otherwise({redirectTo:"/"})}]),angular.module("jwwebApp").constant("_",window._).constant("ServerUrl","http://localhost:3000/").constant("AmazonBucket","https://dubya-blog-bucket.s3.amazonaws.com/"),angular.module("MainDirective").directive("jwNavbar",["trace",function(){return{restrict:"EA",link:function(a,b){$(b).on("click","a#menu-icon",function(){$(this).toggleClass("active"),$("nav.navbar").toggleClass("active")})}}}]),angular.module("MainDirective").directive("jwPost",[function(){return{restrict:"EA",link:function(){setTimeout(function(){$(".post").css("height",$(".post").height()+$(".post").find(".post-content").height()-$(".post").find(".post-content").offset())},100)}}}]),angular.module("MainDirective").directive("homeSlider",["trace",function(){return{restrict:"EA",link:function(){}}}]),angular.module("MainDirective").directive("jwPrettyprint",[function(){return{restrict:"C",link:function(a,b,c){trace(a,b,c),setTimeout(function(){b.html(prettyPrintOne(replaceText(b.html()),"",!0))},100)}}}]),angular.module("jwwebApp").factory("trace",function(){return function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])}}),angular.module("jwwebApp").service("anchorSmoothScroll",["$document","$window",function(a,b){function c(a,b){return a.pageYOffset?a.pageYOffset:b.documentElement&&b.documentElement.scrollTop?b.documentElement.scrollTop:b.body.scrollTop?b.body.scrollTop:0}function d(a,b){for(var c=b.offsetTop,d=b;d.offsetParent&&d.offsetParent!==a.body;)d=d.offsetParent,c+=d.offsetTop;return c}var e=a[0],f=b;this.scrollDown=function(a,b,c,d){for(var e=0,f=Math.round(d/25),g=a+f,h=a;b>h;h+=f)setTimeout("window.scrollTo(0, "+g+")",e*c),g+=f,g>b&&(g=b),e++},this.scrollUp=function(a,b,c,d){for(var e=0,f=Math.round(d/25),g=a-f,h=a;h>b;h-=f)setTimeout("window.scrollTo(0, "+g+")",e*c),g-=f,b>g&&(g=b),e++},this.scrollToTop=function(a){scrollTo(0,a)},this.scrollTo=function(a,b){var g=e.getElementById(a);if(g){var h=c(f,e),i=d(e,g),j=i>h?i-h:h-i;if(100>j)this.scrollToTop(i);else{var k=Math.round(j/100);b=b||(k>20?20:k),i>h?this.scrollDown(h,i,b,j):this.scrollUp(h,i,b,j)}}}}]),angular.module("jwwebApp").factory("AuthFactory",["$http","$window","ServerUrl","trace",function(a,b,c,d){var e=function(e){return d(e),a.post(c+"login",e).success(function(c){$.each(c,function(a,c){b.sessionStorage.setItem("jw-"+a,c)}),a.defaults.headers.common.Authorization="Token token="+b.sessionStorage.getItem("jw-token")})},f=function(){return a.get(c+"logout").success(function(){b.sessionStorage.removeItem("jw-token")})},g=function(){return!!b.sessionStorage.getItem("jw-token")},h=function(){return d(b.sessionStorage),!!b.sessionStorage.clear()};return{login:e,logout:f,isAuthenticated:g,clearStorage:h}}]),angular.module("jwwebApp").factory("PostsFactory",["$http","ServerUrl",function(a,b){var c=[],d=function(){a.get(b+"posts").success(function(a){angular.copy(a,c)}).error(function(a,b,c,d){trace(a,b,c,d)})};return{fetch:d,posts:c}}]),angular.module("jwwebApp").factory("CategoryFactory",["$http","ServerUrl","trace",function(a,b,c){var d=[],e=function(){a.get(b+"categories").success(function(a){angular.copy(a,d)}).error(function(a,b,d,e){c(a,b,d,e)})};return{categories:d,fetch:e}}]),angular.module("jwwebApp").factory("AWSFactory",["$http","$q","$location","ServerUrl","AmazonBucket","trace",function(a,b,c,d,e,f){var g,h,i=function(c,f){return h=f,a.get(d+"amazon/sign_key").success(function(a){g=a;var d={image:{post_id:f,url:e+g.key}};h?b.all(j(d,f)).then(function(){k(c)}):k(c)})},j=function(b,c){var e=[];e.push(a.post(d+"posts/"+c+"/images",b))},k=function(d){var i=new FormData;i.append("key",g.key),i.append("AWSAccessKeyId",g.access_key),i.append("policy",g.policy),i.append("acl","public-read"),i.append("signature",g.signature),i.append("Content-Type","image/jpeg"),i.append("file",d),a.post(e,i,{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).success(function(){b.all(function(){h&&c.path("/posts/"+h)})}).error(function(a,b,c,d){f(a,b,c,d,"failed posting to AWS")})};return{prepareKey:i}}]),angular.module("jwwebApp").filter("truncate",["trace",function(){return function(a){return a.slice(0,100)+"..."}}]),angular.module("MainController").controller("AboutController",["$scope","trace",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.stupidThings=["FormData .append()","rain","another stupid shitty thing","clouds"]}]),angular.module("MainController").controller("HomeController",["$scope","$location","$anchorScroll","anchorSmoothScroll","PostsFactory","trace",function(a,b,c,d,e){a.posts=e.posts,a.hasImage=function(a){return a.images.length>0},a.scrollDown=function(a){c.yOffset=50,b.hash(a),d.scrollTo(a)}}]),angular.module("MainController").controller("PostViewController",["$scope","$sce","$q","$http","$route","$routeParams","$location","AuthFactory","AmazonBucket","AWSFactory","CategoryFactory","ServerUrl","trace",function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.categories=k.categories,d.get(l+"posts/"+f.postId.toString()).success(function(b){a.post=b,_.forEach(a.categories,function(b){a.hasCategory(b)&&(b.checked=!0)})}).error(function(a,b,c,d){m(a,b,c,d,"you are so stupid")});var n=function(b){var c=[];return _.forEach(a.categories,function(e){var f=e.checked,g="undefined"!=typeof _.find(a.post.categories,{id:e.id});f&&!g&&c.push(d.put(l+"posts/"+b+"/categories/"+e.id).success(function(a){m(a)})),!f&&g&&c.push(d.delete(l+"posts/"+b+"/categories/"+e.id).success(function(a){m(a)}))}),c},o=function(a){for(var b=[],c=$('#imageUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(j.prepareKey(f,a))}return b};a.upsertPost=function(b){var f={post:b};b.id&&d.put(l+"posts/"+b.id,f).success(function(b){c.all(o(b.id),n(b.id)).then(function(){e.reload(),a.message="Good job motherfucker, you edited your blog post."})})},a.hasCategory=function(b){var c=[];return"undefined"!=typeof a.post&&"undefined"!=typeof a.post.categories&&(c=a.post.categories.filter(function(a){return a.id===b.id})),c.length>0},a.isLoggedIn=function(){return h.isAuthenticated()},a.deletePost=function(a){d.delete(l+"posts/"+a.id).success(function(){g.path("/")})}}]),angular.module("MainController").controller("NewPostController",["$scope","$q","$http","$location","AuthFactory","AmazonBucket","AWSFactory","CategoryFactory","ServerUrl","trace",function(a,b,c,d,e,f,g,h,i){a.categories=h.categories;var j=function(b){var d=[];_.forEach(a.categories,function(a){var e=a.checked;e&&d.push(c.put(i+"posts/"+b+"/categories/"+a.id))})},k=function(a){for(var b=[],c=$('#imageUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(g.prepareKey(f,a))}};a.upsertPost=function(a){var e={post:a};c.post(i+"posts",e).success(function(a){b.all(k(a.id),j(a.id)).then(function(){d.path("/posts/"+a.id)})})},a.isLoggedIn=function(){return e.isAuthenticated()}}]),angular.module("MainController").controller("NavbarController",["$scope","$http","$window","$location","ServerUrl","AuthFactory","trace",function(a,b,c,d,e,f){a.accounts=[{method:"Email",url:"mailto:fishermanswharff@mac.com",icon:"images/icons/email-white.svg"},{method:"Github",url:"https://github.com/fishermanswharff",icon:"images/icons/github-white.svg"},{method:"Twitter",url:"https://twitter.com/jasonwharff",icon:"images/icons/twitter-white.svg"},{method:"LinkedIn",url:"https://www.linkedin.com/in/jasonwharff",icon:"images/icons/linkedin-white.svg"},{method:"Instagram",url:"http://instagram.com/jasonwharff",icon:"images/icons/instagram-white.svg"},{method:"Tumblr",url:"http://blog.jasonwharff.com",icon:"images/icons/tumblr-white.svg"}],a.isActive=function(a){return a===d.path()},a.logout=function(){f.logout().success(function(){d.path("/login"),f.clearStorage()})},a.user=function(){return f.getUserData()},a.isLoggedIn=function(){return f.isAuthenticated()}}]),angular.module("MainController").controller("FooterController",["$scope",function(a){a.accounts=[{method:"Email",url:"mailto:fishermanswharff@mac.com",icon:"images/icons/email-white.svg"},{method:"Github",url:"https://github.com/fishermanswharff",icon:"images/icons/github-white.svg"},{method:"Twitter",url:"https://twitter.com/jasonwharff",icon:"images/icons/twitter-white.svg"},{method:"LinkedIn",url:"https://www.linkedin.com/in/jasonwharff",icon:"images/icons/linkedin-white.svg"},{method:"Instagram",url:"http://instagram.com/jasonwharff",icon:"images/icons/instagram-white.svg"},{method:"Tumblr",url:"http://blog.jasonwharff.com",icon:"images/icons/tumblr-white.svg"}]}]),angular.module("MainController").controller("LoginController",["$scope","$location","AuthFactory","trace",function(a,b,c,d){a.createUser=!1,a.login=function(a){c.login(a).success(function(a){b.path("/"),d(a)})},a.newUser=function(){a.createUser=!0}}]),angular.module("MainController").controller("ImageUploader",["$scope","$http","AWSFactory","AuthFactory",function(a,b,c,d){a.upsertImage=function(){for(var a=$('#imageUpload > input[type="file"]'),b=0,d=a.length;d>b;b++){var e=a[b].files[0];c.prepareKey(e)}},a.isLoggedIn=function(){return d.isAuthenticated()}}]);