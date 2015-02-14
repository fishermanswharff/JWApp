'use strict';
angular.module('jwwebApp').controller('ResumeController',['$scope',function($scope){

  $scope.skills = {
    'technical':{
      'Ruby': {'level': 'I wrote fizzbuzz in 5 lines'},
      'Ruby on Rails': {'level': 'I can build api endpoints'},
      'RSpec': {'level': 'I write rspec tests as a basis for curriculum lessons on building Rails applications' },
      'Postgres': {'level': 'Relational Database—used in most of my rails projects'},
      'AngularJS': {'level':'I’ve written custom directives'},
      'Jasmine': {'level': 'I write jasmine tests as a basis for curriculum lessons on Javascript fundamentals'},
      'SQL': {'level':'I know enough to be dangerous'},
      'Javascript': {'level':'Object-oriented javascript used to build this website'},
      'Actionscript 3': {'level':'Contributed to rich, object-oriented internet application with Actionscript 3. I can animate particle systems too.'},
      'jQuery': {'level':'Working on committing the entire documentation to memory'},
      'CSS3': {'level':'Used to build the silky smooth transitions on this website'},
      'HTML5': {'level':'Used to build this website'},
      'Git': {'level':'Used for version control of this website, with webhooks'},
      'Github': {'level':'Used for version control of this website'},
      'SVN': {'level':'Experienced managing and teaching SVN on small to medium projects'},
      'LESS': {'level':'Written my own mixins, used as a css compiler for rich, interactive learning applications'},
      'SASS': {'level':'Written my own mixins, used as a css compiler for styling web applications'},
      'XML': {'level':'Can use xml namespaces, have written thousands of lines of xml'},
      'ANT': {'level':'Worked with custom ANT builds in each phase of a product development lifecycle'}
    },
    'software':{
      'Sublime Text': {
        'level': 'I can create custom ant builds, keyboard shortcut master, customized icon artwork',
        'icon':'images/icons/sublimetext.png'
      },
      'Flash Builder': {
        'level': 'I know my way around',
        'icon':'images/icons/flash-builder.png'
      },
      'Flash': {
        'level':'I can use Actionscript 3 to animate particle effects',
        'icon':'images/icons/flash.png'
      },
      'After Effects': {
        'level':'I can animate on the timeline, I know my way around',
        'icon':'images/icons/after-effects.png'
      },
      'InDesign': {
        'level':'Power User: Integrated InCopy workflow for publishing workflow',
        'icon':'images/icons/indesign.png'
      },
      'Illustrator': {
        'level':'Expert Level: I’ve drawn my own letterforms in Illustrator',
        'icon':'images/icons/illustrator.png'
      },
      'Photoshop': {
        'level':'Power User: I batch like a boss',
        'icon':'images/icons/photoshop.png'
      },
      'Balsamiq': {
        'level':'I know my way around',
        'icon':'images/icons/balsamiq.png'
      },
      'Wordpress': {
        'level':'I do it for money',
        'icon':'images/icons/wordpress.png'
      }
    }
  };

  $scope.experience = {
    'professional': {
      'Educational Media Solutions': {
        'title': 'Interactive Designer, Junior Developer',
        'dates': '2013–2014',
        'description': 'Designer for web and mobile application development company. Projects range from courseware platform design and development, html email design and coding, and web & iOS app design, with a heavy focus on e-learning and education.',
        'url': 'http://www.educationalmediasolutions.com/'
      },
      'Navitome': {
        'title': 'Interactive Designer',
        'dates': '2013–2014',
        'description': 'Designer for Cambridge-based startup. Actively leading the creative direction, UX/UI, prototyping and design on the web application that is the core company product. Other responsibilities include designing and developing the company website as well as the corporate brand identity.',
        'url': 'https://navitome.com/'
      },
      'Center for Social Innovation':{
        'title': 'Designer, Developer',
        'dates': '2009–2014',
        'description': 'Lead designer on multi-million dollar initiatives designing and developing interactive, multi-media e-learning platforms and websites. Led design and creative team through 400% company growth while aligning design and development decisions with strategic business goals and objectives.',
        'url': 'http://www.center4si.com/'
      }
    },
    'education': {
      'General Assembly': {
        'program': 'Web Development Immersive',
        'dates': 'Fall 2014',
        'description': 'Twelve weeks. All day. Every day.',
        'url': 'https://generalassemb.ly/education/web-development-immersive'
      },
      'School of the Museum of Fine Arts': {
        'program': 'Graphic Design Certificate',
        'description': 'The certificate program in Graphic Design provides you with the practical and theoretical skills of a design professional. Throughout the program, you will work alongside a team of faculty with extensive teaching experience and recognition in their field.',
        'dates': '2008–2009',
        'url': 'http://www.smfa.edu/'
      },
      'Elon University': {
        'program': 'Bachelor of Art',
        'description': '',
        'dates': '1998–2002',
        'url': 'http://www.elon.edu/home/'
      }
    }
  };

  $scope.contacts = {
    'Email': {
      'url': 'mailto:fishermanswharff@mac.com',
      'icon': 'images/icons/email.svg'
    },
    'Github': {
      'url': 'https://github.com/fishermanswharff',
      'icon': 'images/icons/github.svg'
    },
    'Twitter': {
      'url': 'https://twitter.com/jasonwharff',
      'icon': 'images/icons/twitter.svg'
    },
    'LinkedIn': {
      'url': 'https://www.linkedin.com/in/jasonwharff',
      'icon': 'images/icons/linkedin.svg'
    },
    'Instagram': {
      'url': 'http://instagram.com/jasonwharff',
      'icon': 'images/icons/instagram.svg'
    },
    'Tumblr': {
      'url': 'http://blog.jasonwharff.com',
      'icon': 'images/icons/tumblr.svg'
    }
  };

}]);