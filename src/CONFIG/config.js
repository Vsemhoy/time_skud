export const PRODMODE = (!(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
export const HOST_COMPONENT_ROOT = !PRODMODE ? '' : '/com/skud';
// Websocket backend-for-frontend PORT
export const BFF_PORT = 5003;


// Старое
//export const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]') ? document.querySelector('meta[name="csrf-token"]').content : null;
// export const HTTP_HOST  = document.querySelector('meta[name="host"]') ? document.querySelector('meta[name="host"]').content : null;
// export const HTTP_ROOT = HTTP_HOST ? HTTP_HOST.replace('time', '') : '';
// export const BASE_NAME = PRODMODE ? '/skud' : '/';
// export const BASE_ROUTE = PRODMODE ? '/skud' : '';


// Новое
export const HTTP_HOST = window.location.hostname; // только IP или домен, без порта
export const HTTP_ROOT = `http://${window.location.hostname}`;
export const FRONT_PORT = window.location.port;
export const HTTP_ROOT_FRONT = `http://${window.location.hostname}:${FRONT_PORT}`;
export const BASE_NAME = PRODMODE ? '/' : '/';
export const BASE_ROUTE = PRODMODE ? '' : '';
export const CSRF_TOKEN = decodeURIComponent(
    document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1] || ''
);
console.log('CSRF_TOKEN', CSRF_TOKEN);
