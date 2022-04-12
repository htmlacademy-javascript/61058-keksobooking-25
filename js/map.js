import {disableInterface, enableInterface} from './form.js';
import {adForm} from './validation.js';
import {renderAd} from './ads.js';

const inputAddress = adForm.querySelector('input[name="address"]');

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker({
    lat: 35.67500,
    lng: 139.75000,
  },{
    draggable: true,
    icon: mainPinIcon,
  }, );

  function setCurrentAddress() {
    const location = mainPinMarker.getLatLng();
    inputAddress.value = `${location.lat.toFixed(5)} ${location.lng.toFixed(5)}`;
  };

const setupMap = (ads) => {
  disableInterface();

    map.on('load', () => {
      enableInterface();
      setTimeout(setCurrentAddress, 0);
    })
    .setView({
      lat: 35.67500,
      lng: 139.75000,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const location = evt.target.getLatLng();
    inputAddress.value = `${location.lat.toFixed(5)} ${location.lng.toFixed(5)}`;
  });

  ads.forEach((ad) => {
    const location = ad.location;

    const pinMarker = L.marker({
      lat: location.lat,
      lng: location.lng,
    }, {
      icon: pinIcon,
    }, );

    pinMarker.addTo(map).bindPopup(renderAd(ad));
  });
};

const putMapBack = () => {
  mainPinMarker.setLatLng({lat: 35.67500, lng: 139.75000,});
  map.setView({lat: 35.67500, lng: 139.75000,}, 13);
};

export {setupMap, setCurrentAddress, putMapBack};
