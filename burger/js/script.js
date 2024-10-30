'use strict'

let hover = document.querySelectorAll('.img__ingredients');
let list = document.querySelectorAll('.ingredients__list');
let listClose = document.querySelector('.close__cross');
let burgerButton = document.querySelector('.burger__menu');
let tabletsMenu = document.querySelector('.menu--tablets');
let tabletsMenuClose = document.querySelector('.menu__close');
let menuLink = document.querySelectorAll('.menu__item');

//работа гамбургер-меню на планшетах/телефонах

$(burgerButton).on('click touchstart touchend', () => {
    $(tabletsMenu).toggleClass('visible');
    $(tabletsMenu).css('position', 'fixed');
  });

$(tabletsMenuClose).on('click touchstart touchend', () => {
  $(tabletsMenu).toggleClass('visible');
});

$(menuLink).on('click touchstart', () => {
  $(tabletsMenu).toggleClass('visible');
});

// работа выпадающего меню с ингредиентами
$(hover).on('pointerenter', () => {
  $(list).css('opacity', '0.8');
  $(list).css('transition', '0.5s');
});

$(hover).on('pointerleave', () => {
  $(list).css('opacity', '0');
});
 
$(hover).on('touchstart', () => {
  $(list).css('opacity', '0.8');
  $(list).css('transition', '0.5s');
});

$(hover).on('touchend', () => {
  $(list).css('opacity', '0.8');
});

$(listClose).on('touchstart', () => {
  $(list).css('opacity', '0');
});

//модалка
  $(function () {

    $("[data-fancybox]").fancybox({
      slideClass : 'popup__layout'
    });

  })

//аккордеон 
  
$('.item__title').on('click touchstart touchend', e => {
  const $this = $(e.currentTarget),
        item = $this.closest('.accordeon__item'),
        content = item.find('.item__info'),
        list = $this.closest('.accordeon__list'),
        items = list.find('.accordeon__item'),
        otherContent = list.find('.item__info'),
        title = item.find('.item__title'),
        titles = list.find('.item__title'),
        duration = 1000;

if (!item.hasClass('accordeon__item-active')) {
  items.removeClass('accordeon__item-active');
  item.addClass('accordeon__item-active');
  titles.removeClass('item__title-active');
  title.addClass('item__title-active');
  otherContent.stop(true, true).slideUp(duration);
  content.stop(true, true).slideDown(duration);
  content.css('display', 'flex');
} else {
  content.stop(true, true).slideUp(duration);
  item.toggleClass('accordeon__item-active');
  title.toggleClass('item__title-active');
}
});

//слайдер

let moveSlide = (container, slideNum) => {
  let items = container.find('.slider__content'),
  activeSlide = items.filter('.slider__content--active'),
  reqItem = items.eq(slideNum),
  reqIndex = reqItem.index(),
  list = container.find('.slider__list'),
  duration = 0;
  

if (reqItem.length) {
  list.animate({
    'left': -reqIndex * 100 + '%'
  }, duration, function() {
    activeSlide.removeClass('slider__content--active');
    reqItem.addClass('slider__content--active');
  });
}
}

$('.scroll__link').on('click touchstart', function(e) {

  e.preventDefault();

  let $this = $(this),
      container = $this.closest('.slider'),
      items = container.find('.slider__content'),
      activeItem = items.filter('.slider__content--active'),
      nextItem = activeItem.next(),
      prevItem = activeItem.prev();
 
    
      if ($this.hasClass('scroll__link--right')) {
        if (nextItem.length) {
          moveSlide(container, nextItem.index());    
        } else {
          moveSlide(container, items.first().index());
        }
            
      } else {
        if (prevItem.length) {
          moveSlide(container, prevItem.index());   
        } else {
          moveSlide(container, items.last().index());
        }             
      }
});


//вертикальный слайдер в секции Меню

$('.acco__item').on('click touchstart touchend', (e) => {

  let $this = $(e.target),
      container = $this.closest('.acco'),
      items = container.find('.acco__item'),
      activeItem = items.filter('.acco__item--active'),
      item = $this.closest('.acco__item'),
      title = item.find('.acco__item-title'),
      titleList = container.find('.acco__item-title'),
      text = item.find('.acco__item-text');
      

      if (!item.hasClass('acco__item--active')) {
        items.removeClass('acco__item--active');
        item.addClass('acco__item--active');
      } else {
        item.toggleClass('acco__item--active');
      }
      
      if (!title.hasClass('acco__item-title--active')) {
        titleList.removeClass('acco__item-title--active');
        title.addClass('acco__item-title--active');
      } else {
        title.toggleClass('acco__item-title--active');
      }

});

//прокрутка страниц 

const display = $('.maincontent');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchPaginator = sectionEq => {
  sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
  $('.paginator__list').children('li').eq(sectionEq).addClass('active').siblings().removeClass('active')
}

const performTransition = sectionEq => {

  if (inScroll) return
    inScroll = true;

    const position = (sectionEq * -100) + '%';  

    display.css({
      'transform' : `translate(0, ${position})`,
      '-webkit-transform' : `translate(0, ${position})`
    });
  
    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

    setTimeout(() => {
      inScroll = false;
      switchPaginator(sectionEq);
    }, 1200);
} 

const defineSections = sections => {
  const activeSection = sections.filter('.active');

  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }
}

const scrollToSection = direction => {
  const section = defineSections(sections);

  if (inScroll) return;

  if (direction === 'up' && section.nextSection.length) {
    performTransition(section.nextSection.index());
  }

  if (direction === 'down' && section.prevSection.length) {
    performTransition(section.prevSection.index());
  }
} 

$('.wrapper').on( {
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    let direction = (deltaY > 0) ? 'up' : 'down';

    scrollToSection(direction);
  },
  touchmove: e => (e.preventDefault())
});

$(document).on('keydown', e => {
  const section = defineSections(sections);

  if (inScroll) return 

  switch (e.keyCode) {
    case 40:
    if (!section.nextSection.length) return ;
    performTransition(section.nextSection.index());
    break;

    case 38:
    if (!section.prevSection.length) return ;
    performTransition(section.prevSection.index());
    break;
    }
  
});

if (isMobile) {
  $(window).swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  });
}

$('[data-scroll-to]').on('click touchstart', e => {

  e.preventDefault();

  const $this = $(e.currentTarget);
  const sectionIndex = parseInt($this.attr('data-scroll-to'));

  performTransition(sectionIndex);

});
 

// отправка данных из формы заказа

var submitForm = function (ev) {
  ev.preventDefault();

  var form = $(ev.target);
      
  var request = ajaxForm(form);

  request.done(function(msg) {
      var mes = msg.mes,
          status = msg.status;
      if (status === 'OK') {
        form.append('<p class="success">' + mes + '</p>');
      } else{
          form.append('<p class="error">' + mes + '</p>');
      }
  });

  request.fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
  });
}

var ajaxForm = function (form) {

  var url = form.attr('action'),
      data = form.serialize();

  return $.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: 'JSON'
  });

}

$('#order-form').on('submit', submitForm);