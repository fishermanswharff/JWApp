"use strict";angular.module("MainController",[]),angular.module("MainDirective",[]),angular.module("jwwebApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","MainController","MainDirective"]).run(["$rootScope","$location","$http","$window","AuthFactory","PostsFactory","CategoryFactory",function(a,b,c,d,e,f,g){a.$on("$routeChangeStart",function(){e.isAuthenticated()&&(c.defaults.headers.common.Authorization="Token token="+d.sessionStorage.getItem("jw-token")),$("nav.navbar").removeClass("active"),$("a#menu-icon").removeClass("active"),f.fetch(),g.fetch()}),a.$on("$routeChangeSuccess",function(){})}]),angular.module("jwwebApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController"}).when("/posts/:postId",{templateUrl:"views/post.html",controller:"PostViewController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutController"}).when("/login",{templateUrl:"views/login.html",controller:"LoginController"}).when("/new-post",{templateUrl:"views/newPost.html",controller:"NewPostController"}).when("/image-uploader",{templateUrl:"views/image-uploader.html",controller:"ImageUploader"}).when("/resume",{templateUrl:"views/resume.html",controller:"ResumeController"}).when("/categories",{templateUrl:"/views/categories.html",controller:"CategoriesController"}).otherwise({redirectTo:"/"})}]),angular.module("jwwebApp").constant("_",window._).constant("ServerUrl","http://jwdotcom.herokuapp.com/").constant("AmazonBucket","https://dubya-blog-bucket.s3.amazonaws.com/"),angular.module("MainDirective").directive("jwNavbar",["trace",function(a){return{restrict:"EA",link:function(b,c){$(c).on("click","a#menu-icon",function(b){$(this).toggleClass("active"),$("nav.navbar").toggleClass("active"),a(b)})}}}]),angular.module("MainDirective").directive("postGallery",["trace","$timeout",function(a,b){return{restrict:"EA",templateUrl:"../views/post-gallery.html",link:function(a,c){var d={imgContainer:c.find(".slider-photos"),images:[],currentIndex:0,containerWidth:c.find(".slider-container").width()};d.init=function(){TweenLite.to(c.find(".slider-photos"),.5,{opacity:"1"}),d.images=c.find(".slider-photos img"),d.positionImages(),d.addEventListeners()},d.addEventListeners=function(){$(c).on("click","a",function(a){d.clickHandler(a)})},d.positionImages=function(){for(var a=d.images,b=d.containerWidth,c=0;c<a.length;c++){var e=c*b;$(a[c]).css("width",b+"px").css("left",e+"px").css("top","0px"),$(".slider-photos").css("width",e+b+"px")}},d.setCurrentIndex=function(a){d.currentIndex=a,d.currentIndex>d.images.length-1?d.currentIndex=0:d.currentIndex<0&&(d.currentIndex=d.images.length-1)},d.clickHandler=function(a){switch($(a.currentTarget).attr("class")){case"slider-nav prev":d.setCurrentIndex(d.currentIndex-1);break;case"slider-nav next":d.setCurrentIndex(d.currentIndex+1)}d.updateView()},d.updateView=function(){var a=d.currentIndex-1,b=d.currentIndex+1;0>a&&(a=d.images.length-1),b>d.images.length-1&&(b=0);var c=new TimelineMax({align:"start"});c.add([TweenLite.to(d.images[a],.5,{left:"-"+d.containerWidth+"px",opacity:"0"}),TweenLite.to(d.images[d.currentIndex],.5,{left:"0px",opacity:"1"}),TweenLite.to(d.images[b],.5,{left:d.containerWidth+"px",opacity:"0"})],0),d.images.map(function(a){a===d.currentIndex?$(d.images[a]).css("z-index",1):$(d.images[a]).css("z-index",0)}),$(".currentPanel").html(d.currentIndex)},b(function(){d.init(),d.setCurrentIndex(1),d.updateView()},1e3)}}}]),angular.module("MainDirective").directive("contactForm",["trace","$http","ServerUrl","$q",function(){return{restrict:"EA",templateUrl:"../views/contact-form.html",link:function(){}}}]),angular.module("MainDirective").directive("homeSlider",["trace","$timeout",function(a,b){return{restrict:"EA",link:function(c,d){b(function(){},200),d.bind("click",function(){a("hello world")})}}}]),angular.module("MainDirective").directive("postform",function(){return{restrict:"EA",templateUrl:"../views/post-form.html",link:function(){}}}),angular.module("MainDirective").directive("categoryform",function(){return{restrict:"EA",templateUrl:"../views/category-form.html",link:function(){}}}),angular.module("MainDirective").directive("postView",["trace",function(){return{restrict:"EA",templateUrl:"../views/post-view.html",link:function(a,b){setTimeout(function(){for(var a=b.find("pre"),c=0;c<a.length;c++)prettyPrint($(a[c]).html(),"",!0),$("li.L1,li.L3,li.L5,li.L7,li.L9").css("background","none"),$("pre").css("padding","15px 0")},1e3)}}}]),angular.module("MainDirective").directive("postViewForm",["trace",function(){return{restrict:"EA",templateUrl:"../views/post-view-form.html",link:function(){}}}]),angular.module("jwwebApp").factory("trace",function(){return function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])}}),angular.module("jwwebApp").service("anchorSmoothScroll",["$document","$window",function(a,b){function c(a,b){return a.pageYOffset?a.pageYOffset:b.documentElement&&b.documentElement.scrollTop?b.documentElement.scrollTop:b.body.scrollTop?b.body.scrollTop:0}function d(a,b){for(var c=b.offsetTop,d=b;d.offsetParent&&d.offsetParent!==a.body;)d=d.offsetParent,c+=d.offsetTop;return c}var e=a[0],f=b;this.scrollDown=function(a,b,c,d){for(var e=0,f=Math.round(d/25),g=a+f,h=a;b>h;h+=f)setTimeout("window.scrollTo(0, "+g+")",e*c),g+=f,g>b&&(g=b),e++},this.scrollUp=function(a,b,c,d){for(var e=0,f=Math.round(d/25),g=a-f,h=a;h>b;h-=f)setTimeout("window.scrollTo(0, "+g+")",e*c),g-=f,b>g&&(g=b),e++},this.scrollToTop=function(a){scrollTo(0,a)},this.scrollTo=function(a,b){var g=e.getElementById(a);if(g){var h=c(f,e),i=d(e,g),j=i>h?i-h:h-i;if(100>j)this.scrollToTop(i);else{var k=Math.round(j/100);b=b||(k>20?20:k),i>h?this.scrollDown(h,i,b,j):this.scrollUp(h,i,b,j)}}}}]),angular.module("jwwebApp").factory("AuthFactory",["$http","$window","ServerUrl","trace",function(a,b,c,d){var e=function(b){return d(b),a.post(c+"login",b).success(function(a){j(a)})},f=function(){return a.get(c+"logout").success(function(a){b.sessionStorage.removeItem("jw-token"),d(a)})},g=function(){return!!b.sessionStorage.getItem("jw-token")},h=function(){return d(b.sessionStorage),!!b.sessionStorage.clear()},i=function(b){return a.post(c+"users",{user:b}).success(function(a){j(a)}).error(function(a,b,c,e){d(a,b,c,e,"you are so stupid, you are doing it wrong")})},j=function(c){$.each(c,function(a,c){b.sessionStorage.setItem("jw-"+a,c)}),a.defaults.headers.common.Authorization="Token token="+b.sessionStorage.getItem("jw-token")};return{login:e,logout:f,isAuthenticated:g,clearStorage:h,postNewUser:i}}]),angular.module("jwwebApp").factory("PostsFactory",["$http","ServerUrl","trace",function(a,b,c){var d=[],e=function(){a.get(b+"posts").success(function(a){angular.copy(a,d)}).error(function(a,b,d,e){c(a,b,d,e)})};return{fetch:e,posts:d}}]),angular.module("jwwebApp").factory("CategoryFactory",["$http","ServerUrl","trace",function(a,b,c){var d=[],e=function(){a.get(b+"categories").success(function(a){angular.copy(a,d)}).error(function(a,b,d,e){c(a,b,d,e)})};return{categories:d,fetch:e}}]),angular.module("jwwebApp").factory("AWSFactory",["$rootScope","$http","$q","$location","ServerUrl","AmazonBucket","trace",function(a,b,c,d,e,f,g){var h,i,j=function(){return c(function(a){b.get(e+"amazon/sign_key").success(function(b){a(b)}).error(function(a,b,c,d){g(a,b,c,d,"failed to get a signkey from api")})})},k=function(c,d,e,g){return i=d,j().then(function(j){h=j,!i||e||g?i&&g?o(m(i),d,"/thumbnails").then(function(){b.post(f,p(c),{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).then(function(b){return a.awsResponse=b,b})}):i&&e?o(n(i),d,"/featured_images").then(function(){b.post(f,p(c),{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).then(function(b){return a.awsResponse=b,b})}):b.post(f,p(c),{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).then(function(b){return a.awsResponse=b,b}):o(l(i),d,"/images").then(function(){b.post(f,p(c),{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).then(function(b){return a.awsResponse=b,b})})})},l=function(a){var b={image:{post_id:a,url:f+h.key}};return b},m=function(){var a={thumbnail:{post_id:i,url:f+h.key}};return a},n=function(){var a={featured_image:{post_id:i,url:f+h.key}};return a},o=function(a,d,f){return c(function(c,g){b.post(e+"posts/"+d+f,a).success(function(a){c(a)}).error(function(a){g(a)})})},p=function(a){var b=new FormData;return b.append("key",h.key),b.append("AWSAccessKeyId",h.access_key),b.append("policy",h.policy),b.append("acl","public-read"),b.append("signature",h.signature),b.append("Content-Type","image/jpeg"),b.append("file",a),b};return{sendToAmazon:k}}]),angular.module("jwwebApp").filter("truncate",["trace",function(a){return function(b){return a(),b.slice(0,150)+"..."}}]),angular.module("jwwebApp").filter("postsFilter",["trace",function(){return function(a,b){var c=new Array;if(!b)return a;for(var d in a)a[d].categories.length>0&&$(a[d].categories).each(function(e,f){f.name==b&&c.push(a[d])});return c}}]),angular.module("MainController").controller("AboutController",["$scope","trace",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.stupidThings=["FormData .append()","rain","another stupid shitty thing","clouds"],b()}]),angular.module("MainController").controller("HomeController",["$scope","$location","$anchorScroll","anchorSmoothScroll","PostsFactory","trace",function(a,b,c,d,e,f){a.posts=e.posts,a.hasImage=function(a){return a.images.length>0},a.scrollDown=function(a){c.yOffset=50,b.hash(a),d.scrollTo(a)},f(a.posts)}]),angular.module("MainController").controller("PostViewController",["$rootScope","$scope","$sce","$q","$http","$route","$routeParams","$location","AuthFactory","AWSFactory","CategoryFactory","ServerUrl","trace",function(a,b,c,d,e,f,g,h,i,j,k,l,m){b.categories=k.categories,b.post={};var n=function(){e.get(l+"posts/"+g.postId.toString()).success(function(a){b.post=a,d.all(o(a),p()).then(function(){b.post=a,m(b.post)})}).error(function(a,b,c,d){m(a,b,c,d,"you are so stupid")})},o=function(a){b.post=a},p=function(){_.forEach(b.categories,function(a){return b.hasCategory(a)?a.checked=!0:void 0})},q=function(a){var c=[];return _.forEach(b.categories,function(d){var f=d.checked,g="undefined"!=typeof _.find(b.post.categories,{id:d.id});f&&!g&&c.push(e.put(l+"posts/"+a+"/categories/"+d.id)),!f&&g&&c.push(e.delete(l+"posts/"+a+"/categories/"+d.id))}),c},r=function(a){for(var b=[],c=$('#thumbnailUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(j.sendToAmazon(f,a,!1,!0))}return b},s=function(a){for(var b=[],c=$('#featuredUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(j.sendToAmazon(f,a,!0,!1))}return b},t=function(a){for(var b=[],c=$('#imageUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(j.sendToAmazon(f,a))}return b};b.upsertPost=function(c){$(".ajax-preloader").addClass("submitted"),$('button[type="submit"]').attr("disabled",!0);var g={post:c};c.id&&e.put(l+"posts/"+c.id,g).success(function(){d.all([t(b.post.id),q(b.post.id),r(b.post.id),s(b.post.id)]).then(function(b){b[0].length>0?a.$watch("awsResponse",function(a){a&&204===a.status&&($(".ajax-preloader").removeClass("submitted"),$('button[type="submit"]').attr("disabled",!1),f.reload())}):($(".ajax-preloader").removeClass("submitted"),$('button[type="submit"]').attr("disabled",!1))}).finally(function(){n(),b.message="Good job motherfucker, you edited your blog post."})})},b.hasCategory=function(a){var c=[];return"undefined"!=typeof b.post&&"undefined"!=typeof b.post.categories&&(c=b.post.categories.filter(function(b){return b.id===a.id})),c.length>0},b.isLoggedIn=function(){return i.isAuthenticated()},b.deletePost=function(a){e.delete(l+"posts/"+a.id).success(function(){h.path("/")})},n()}]),angular.module("MainController").controller("NewPostController",["$rootScope","$scope","$q","$http","$location","AuthFactory","AmazonBucket","AWSFactory","CategoryFactory","ServerUrl","trace",function(a,b,c,d,e,f,g,h,i,j,k){b.categories=i.categories;var l=function(a){k("hello from update categories function");var c=[];return _.forEach(b.categories,function(b){var e=b.checked;e&&c.push(d.put(j+"posts/"+a+"/categories/"+b.id))}),c},m=function(a){k("hello from update images function");for(var b=[],c=$('#imageUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(h.sendToAmazon(f,a))}return b},n=function(a){k("hello from update thumbnail function");for(var b=[],c=$('#thumbnailUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(h.sendToAmazon(f,a,!1,!0))}return b},o=function(a){for(var b=[],c=$('#featuredUpload > input[type="file"]'),d=0,e=c.length;e>d;d++){var f=c[d].files[0];f&&b.push(h.sendToAmazon(f,a,!0,!1))}return b};b.upsertPost=function(b){$(".ajax-preloader").addClass("submitted"),$('button[type="submit"]').attr("disabled",!0);var f={post:b};d.post(j+"posts",f).success(function(b){var d=b;c.all([m(d.id),l(d.id),n(d.id),o(d.id)]).then(function(b){0===b[0].length||0===b[2].length||0===b[3].length?($(".ajax-preloader").removeClass("submitted"),e.path("/posts/"+d.id)):a.$watch("awsResponse",function(a){a&&204===a.status&&($(".ajax-preloader").removeClass("submitted"),e.path("/posts/"+d.id))})})})},b.upsertCategory=function(a){var c={category:a};d.post(j+"categories",c).success(function(a){b.categories.push(a),$('form[name="categoryForm"]').each(function(){this.reset()})}).error()},b.isLoggedIn=function(){return f.isAuthenticated()},k()}]),angular.module("MainController").controller("NavbarController",["$scope","$http","$window","$location","ServerUrl","AuthFactory","trace",function(a,b,c,d,e,f,g){a.accounts=[{method:"Email",url:"mailto:fishermanswharff@mac.com"},{method:"Github",url:"https://github.com/fishermanswharff"},{method:"Twitter",url:"https://twitter.com/jasonwharff"},{method:"LinkedIn",url:"https://www.linkedin.com/in/jasonwharff"},{method:"Instagram",url:"http://instagram.com/jasonwharff"},{method:"Tumblr",url:"http://blog.jasonwharff.com"}],a.isActive=function(a){return a===d.path()},a.logout=function(){f.logout().success(function(){d.path("/login"),f.clearStorage()})},a.user=function(){return f.getUserData()},a.isLoggedIn=function(){return f.isAuthenticated()},g()}]),angular.module("MainController").controller("FooterController",["$scope",function(a){a.accounts=[{method:"Email",url:"mailto:fishermanswharff@mac.com"},{method:"Github",url:"https://github.com/fishermanswharff"},{method:"Twitter",url:"https://twitter.com/jasonwharff"},{method:"LinkedIn",url:"https://www.linkedin.com/in/jasonwharff"},{method:"Instagram",url:"http://instagram.com/jasonwharff"},{method:"Tumblr",url:"http://blog.jasonwharff.com"}]}]),angular.module("MainController").controller("LoginController",["$scope","$http","$location","AuthFactory","trace",function(a,b,c,d,e){a.createUser=!1,a.message="",a.login=function(a){d.login(a).success(function(a){c.path("/"),e(a)})},a.newUser=function(){a.createUser=!0},a.upsertUser=function(b){d.postNewUser(b).success(function(b){c.path("/login"),a.message="Congratulations, you successfully created an account. Please login to continue.",e(b)})}}]),angular.module("MainController").controller("ContactFormController",["$scope","$http","ServerUrl","trace",function(a,b,c){a.submitContact=function(d){$(".preloader").addClass("submitted"),$("#contact-submit-button").attr("disabled",!0),b.post(c+"email/admin",{name:d.name,email:d.email,body:d.body}).success(function(){a.message={},a.success="Your email was sent successfully.",$("#contact-submit-button").attr("disabled",!1),$(".preloader").removeClass("submitted")}).error(function(){})}}]),angular.module("jwwebApp").controller("ResumeController",["$scope",function(a){a.skills={technical:{Ruby:{level:"I wrote fizzbuzz in 5 lines"},"Ruby on Rails":{level:"I can build api endpoints"},RSpec:{level:"I write rspec tests as a basis for curriculum lessons on building Rails applications"},Postgres:{level:"Relational Database—used in most of my rails projects"},AngularJS:{level:"I’ve written custom directives"},Jasmine:{level:"I write jasmine tests as a basis for curriculum lessons on Javascript fundamentals"},SQL:{level:"I know enough to be dangerous"},Javascript:{level:"Object-oriented javascript used to build this website"},"Actionscript 3":{level:"Contributed to rich, object-oriented internet application with Actionscript 3. I can animate particle systems too."},jQuery:{level:"Working on committing the entire documentation to memory"},CSS3:{level:"Used to build the silky smooth transitions on this website"},HTML5:{level:"Used to build this website"},Git:{level:"Used for version control of this website, with webhooks"},Github:{level:"Used for version control of this website"},SVN:{level:"Experienced managing and teaching SVN on small to medium projects"},LESS:{level:"Written my own mixins, used as a css compiler for rich, interactive learning applications"},SASS:{level:"Written my own mixins, used as a css compiler for styling web applications"},XML:{level:"Can use xml namespaces, have written thousands of lines of xml"},ANT:{level:"Worked with custom ANT builds in each phase of a product development lifecycle"}},software:{"Sublime Text":{level:"I can create custom ant builds, keyboard shortcut master, customized icon artwork",icon:"images/icons/sublimetext.png"},"Flash Builder":{level:"I know my way around",icon:"images/icons/flash-builder.png"},Flash:{level:"I can use Actionscript 3 to animate particle effects",icon:"images/icons/flash.png"},"After Effects":{level:"I can animate on the timeline, I know my way around",icon:"images/icons/after-effects.png"},InDesign:{level:"Power User: Integrated InCopy workflow for publishing workflow",icon:"images/icons/indesign.png"},Illustrator:{level:"Expert Level: I’ve drawn my own letterforms in Illustrator",icon:"images/icons/illustrator.png"},Photoshop:{level:"Power User: I batch like a boss",icon:"images/icons/photoshop.png"},Balsamiq:{level:"I know my way around",icon:"images/icons/balsamiq.png"},Wordpress:{level:"I do it for money",icon:"images/icons/wordpress.png"}}},a.experience={professional:{"Educational Media Solutions":{title:"Interactive Designer, Junior Developer",dates:"2013–2014",description:"Designer for web and mobile application development company. Projects range from courseware platform design and development, html email design and coding, and web & iOS app design, with a heavy focus on e-learning and education.",url:"http://www.educationalmediasolutions.com/"},Navitome:{title:"Interactive Designer",dates:"2013–2014",description:"Designer for Cambridge-based startup. Actively leading the creative direction, UX/UI, prototyping and design on the web application that is the core company product. Other responsibilities include designing and developing the company website as well as the corporate brand identity.",url:"https://navitome.com/"},"Center for Social Innovation":{title:"Designer, Developer",dates:"2009–2014",description:"Lead designer on multi-million dollar initiatives designing and developing interactive, multi-media e-learning platforms and websites. Led design and creative team through 400% company growth while aligning design and development decisions with strategic business goals and objectives.",url:"http://www.center4si.com/"}},education:{"General Assembly":{program:"Web Development Immersive",dates:"Fall 2014",description:"Twelve weeks. All day. Every day.",url:"https://generalassemb.ly/education/web-development-immersive"},"School of the Museum of Fine Arts":{program:"Graphic Design Certificate",description:"The certificate program in Graphic Design provides you with the practical and theoretical skills of a design professional. Throughout the program, you will work alongside a team of faculty with extensive teaching experience and recognition in their field.",dates:"2008–2009",url:"http://www.smfa.edu/"},"Elon University":{program:"Bachelor of Art",description:"",dates:"1998–2002",url:"http://www.elon.edu/home/"}}},a.contacts={Email:{url:"mailto:fishermanswharff@mac.com",icon:"images/icons/email.svg"},Github:{url:"https://github.com/fishermanswharff",icon:"images/icons/github.svg"},Twitter:{url:"https://twitter.com/jasonwharff",icon:"images/icons/twitter.svg"},LinkedIn:{url:"https://www.linkedin.com/in/jasonwharff",icon:"images/icons/linkedin.svg"},Instagram:{url:"http://instagram.com/jasonwharff",icon:"images/icons/instagram.svg"},Tumblr:{url:"http://blog.jasonwharff.com",icon:"images/icons/tumblr.svg"}}}]),angular.module("MainController").controller("CategoriesController",["$scope","$http","trace","CategoryFactory","ServerUrl",function(a,b,c,d,e){a.categories=d.categories,a.upsertCategory=function(c){var d={category:c};b.post(e+"categories",d).success(function(b){a.categories.push(b),$('form[name="categoryForm"]').each(function(){this.reset()})}).error()}}]),angular.module("MainController").controller("ImageUploader",["$rootScope","$scope","$http","AWSFactory","AuthFactory","trace",function(a,b,c,d,e){b.upsertImage=function(){$(".ajax-preloader").addClass("submitted");for(var b=$('#imageUpload > input[type="file"]'),c=0,e=b.length;e>c;c++){var f=b[c].files[0];f&&d.sendToAmazon(f).then(function(){a.$watch("awsResponse",function(a){a&&204===a.status&&($(".ajax-preloader").removeClass("submitted"),$('button[type="submit"]').attr("disabled",!1))}),$("form#imageUpload").each(function(){this.reset()})})}},b.isLoggedIn=function(){return e.isAuthenticated()}}]);