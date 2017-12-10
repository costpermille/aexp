// Replace this with import when webpacking
let request = require("request")
const jsdom = require("jsdom")
const { JSDOM } = jsdom;

let url = `https://www.aliexpress.com/item/BPI-R2-Banana-PI-R2-Smart-Open-source-Wireless-Router-BPI-R2-Smart-Home-Control-Device/32825598599.html`

request({
	url: url,
	headers: {'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:58.0) Gecko/20100101 Firefox/58.0`}
}, (err, resp, body) => {
	const dom = new JSDOM(body)
	let document = dom.window.document;
	let imgs = document.querySelectorAll('li > span.img-thumb-item > img')
	let img = []
	imgs.forEach( x => { img.push(x.src.replace("_50x50.jpg", "")) })

	let obj = {
		name: document.querySelector("h1.product-name").innerHTML.trim(),
		seller: document.querySelector('a.store-lnk').innerHTML.trim(),
		sellerLocation: document.querySelector('dd.store-address').innerHTML.trim(),
		url: url,
		rating: document.querySelector('[itemprop="ratingValue"]').innerHTML,
		currency: document.querySelector('[itemprop="priceCurrency"]').innerHTML,
		costInCurrency: Number.parseFloat(document.querySelector('#j-sku-price').innerHTML),
		itemId: Number.parseInt(document.querySelector('input[name="objectId"]').value),
		images: img,
	};

	console.log(JSON.stringify(obj))
})

