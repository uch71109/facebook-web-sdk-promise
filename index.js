'use strict';
import loadScript from 'tiny-load-script';
import Console from 'console-class';
const console = new Console('FB SDK', {color:'#3b5998'}).off();
loadSDK.logging = console; // loadSDK.logging.on() or loadSDK.logging.off();

let SDK;

/**
 * Facebook SDK getter
 * @return {Promise} Once resolved it will yield the Facebook SDK object, FB
 * @example
 * loadSDK().then(FB => console.log('FB has loaded'))
 */

export default function loadSDK (config = {}) {
	SDK = SDK || new Promise(function (resolve) {
		const locale = config.locale || 'en_US'
		function sdkReady () {
			console.log('Ready');
			resolve(window.FB);
		}
		if (window.FB && window.FB.init) {
			sdkReady();
		} else {
			console.log('Waiting to be ready');
			window.fbAsyncInit = sdkReady;
			if (!document.querySelector('script[src*="connect.facebook.net"]')) {
				console.warn('Facebook SDK script not found, loading now. Add this in the document to have the SDK available sooner: \n <script src="//connect.facebook.net/en_US/sdk.js" async></script> ');
				loadScript(`//connect.facebook.net/${locale}/sdk.js`);
			}
		}
	});
	return SDK;
};
