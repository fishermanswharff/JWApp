# Karma Tests

* AWSFactory
* AboutController
* FooterController
* HomeController
* LoginController
* MainController
* NavbarController
* PostController
* PostDetailController
* MainDirective
* PostDetailDirective
* NavbarDirective
* AuthFactory
* CategoryFactory
* PostsFactory
* TypeFilter
* SmoothScroll
* TraceService

# AWS Uploader:

Do I need the aws-sdk bower component?

## OnSubmit form

PostController: 

* imageFile as FormData
* get aws_key
* post to api db
* post to aws bucket 

Directive: Get the image from the form element and return formdata. 

Service: Get aws key from API (currently implemented in AWSFactory.prepareKey). Should return a promise of formdata[Stack Overflow](http://stackoverflow.com/questions/19579576/append-files-to-formdata-not-work-in-angularjs)

Service: Post to rails (Currently implemented in AWSFactory.postRails)

Service: Post to AWS
- calling this factory should look something like this: AWSFactory.postImage(data)