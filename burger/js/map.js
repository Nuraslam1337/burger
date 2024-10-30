ymaps.ready(init);
let myMap, 
    myPlacemark,
    myPlacemark2,
    myPlacemark3,
    myPlacemark4

function init(){ 
    myMap = new ymaps.Map("map", {
        center: [59.92822098, 30.39569750],
        zoom: 12
    }); 

    myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);
    
    myPlacemark = new ymaps.Placemark([59.97340750, 30.30945853], {
        hintContent: 'Ресторан Mr Burger',
        balloonContent: 'Мы находимся здесь'}, {
        iconLayout: 'default#image',
        iconImageHref: './icons/map-marker.svg',
        iconImageSize: [45, 60],
        iconImageOffset: [-20, -45]
    });

    myPlacemark2 = new ymaps.Placemark([59.94610627, 30.38334663], {
        hintContent: 'Ресторан Mr Burger',
        balloonContent: 'Мы находимся здесь'}, {
        iconLayout: 'default#image',
        iconImageHref: './icons/map-marker.svg',
        iconImageSize: [45, 60],
        iconImageOffset: [-20, -50]
    });

    myPlacemark3 = new ymaps.Placemark([59.91737384, 30.49606602], {
        hintContent: 'Ресторан Mr Burger',
        balloonContent: 'Мы находимся здесь'}, {
        iconLayout: 'default#image',
        iconImageHref: './icons/map-marker.svg',
        iconImageSize: [45, 60],
        iconImageOffset: [-40, -40]
   });

    myPlacemark4 = new ymaps.Placemark([59.89157462, 30.31134300], {
        hintContent: 'Ресторан Mr Burger',
        balloonContent: 'Мы находимся здесь'}, {
        iconLayout: 'default#image',
        iconImageHref: './icons/map-marker.svg',
        iconImageSize: [45, 60]
    });
    
    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);
    myMap.geoObjects.add(myPlacemark4);
}