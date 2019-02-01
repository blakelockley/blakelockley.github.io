"use strict";

(function($) {
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  $('#basketball').click(function(e){
    $('#overlay').fadeIn();
    startBasketball();
  });

  $('#close').click(function(e) {
    $('#overlay').fadeOut();
    endBasketball();
  });

})(jQuery);

var render;

function startBasketball() {
  var canvas = document.getElementById('world');

  var width = canvas.offsetWidth;
  var height = canvas.offsetHeight;
  
  var engine = Matter.Engine.create();
  var world = engine.world;

  render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: width,
      height: height,
      background: 'transparent',
      wireframes: false,
      showAngleIndicator: false
    }
  });

  var roof = Matter.Bodies.rectangle(width / 2, -40, width, 80, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      visible: false
    }
  });
  Matter.World.add(world, roof);

  var floor = Matter.Bodies.rectangle(width / 2, height+40, width, 80, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      visible: false
    }
  });
  Matter.World.add(world, floor);

  var leftWall = Matter.Bodies.rectangle(230, height / 2, 80, height, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      visible: false
    }
  });
  Matter.World.add(world, leftWall);

  var rightWall = Matter.Bodies.rectangle(width + 40, height / 2, 80, height, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      visible: false
    }
  });
  Matter.World.add(world, rightWall);

  var backboard = Matter.Bodies.rectangle(width / 2, 180, 332, 200, {
    isStatic: true,
    collisionFilter: {
      mask: 0x2
    },
    render: {
      fillStyle: '#FFFFFF',
      strokeStyle: 'black',
      lineWidth: 1
    }
  });
  Matter.World.add(world, backboard);

  var square = Matter.Bodies.rectangle(width / 2, 200, 140, 110, {
    isStatic: true,
    collisionFilter: {
      mask: 0x2
    },
    render: {
      fillStyle: '#FFFFFF',
      strokeStyle: 'black',
      lineWidth: 3
    }
  });
  Matter.World.add(world, square);

  var hoop = Matter.Bodies.rectangle(width / 2, 245, 130, 4, {
    isStatic: true,
    collisionFilter: {
      mask: 0x2
    },
    render: {
      fillStyle: 'orangered',
      strokeStyle: 'orangered',
      lineWidth: 1
    }
  });
  Matter.World.add(world, hoop);

  var ball = Matter.Bodies.circle(400, 200, 50, {
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.6,
    collisionFilter: {
      mask: 0x1
    },
    render: {
      sprite: {
        texture: './img/basketball.png'
      }
    }
  });
  Matter.World.add(world, ball);

  var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
    element: canvas,
    constraint: {
      render: {
        visible: false
      },
      stiffness:0.8
    }
  });
  Matter.World.add(world, mouseConstraint);

  Matter.Engine.run(engine);
  Matter.Render.run(render);
};

function endBasketball(e) {
  render.canvas = null;
  render.context = null;
  render.textures = {};
};
