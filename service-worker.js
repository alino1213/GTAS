"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/gtas_github/index.html","b7750d490d6e0307b0b1bcd4d25b3bcc"],["/gtas_github/static/css/main.30cc7403.css","a52157b64d65c0bc102fc89d9f92d922"],["/gtas_github/static/js/main.ddb727cc.js","0b5b487179b99e8c6b5ac13cea65960f"],["/gtas_github/static/media/CUSTOMER_SERVICE_250x250.255bd22a.svg","255bd22a9659ebcfa794cd8f0e89f4c0"],["/gtas_github/static/media/GTAS_145x145.6d7ce82f.svg","6d7ce82f537d7b521e40f02b6ca12b11"],["/gtas_github/static/media/GTAS_145x145bg.c2196883.svg","c21968830eac4bb8505262a115be118d"],["/gtas_github/static/media/GTAS_COST_BREAKDOWN.cb602273.jpg","cb60227354d040a8117075bb335acb91"],["/gtas_github/static/media/GTAS_EXPLAINER.da0c50f9.svg","da0c50f9716d23333708e52050940771"],["/gtas_github/static/media/GTAS_TIMELINE.bd24084c.jpg","bd24084c69f860439fd390ea2e75332d"],["/gtas_github/static/media/WCO_acrV_EN_Col_1.e4345f9e.svg","e4345f9ebb4f8e0d3e1310b7d34a44cb"],["/gtas_github/static/media/WCO_extH_ENFR_Col.11791152.svg","11791152cb8d0ae68284038a3bd66bd8"],["/gtas_github/static/media/diagram.97a619b2.PNG","97a619b2286d8b63e88d43694cea4740"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));var r="/gtas_github/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});