$(function () {
	$('.image-review').click(toggleReview)

	function toggleReview() {
		// remove class="active" from button clicked
		$(this).parent().parent().removeClass('active')
		// add class="active" to next <li>
		$(this).parent().parent().next().addClass('active')
	}

	// when last <li> clicked, show first <li>
	$('.image-review:last').click(startReview)

	function startReview() {
		$(this).parent().parent().removeClass('active')
		$('.image-review:first').parent().parent().addClass('active')
	}
})

window.onload = function grabElements() {
	let changeInput = document.getElementsByClassName('cart-quantity-input')
	for (let i = 0; i < changeInput.length; i++) {
		changeInput[i].addEventListener('change', changeItemInput)
	}

	let itemCart = document.getElementsByClassName('item-cart')
	for (let i = 0; i < itemCart.length; i++) {
		itemCart[i].addEventListener('click', clickAddToCart)
	}

	let discountOption = document.getElementsByClassName('discount-voucher')
	for (let i = 0; i < discountOption.length; i++) {
		discountOption[i].addEventListener('click', discount)
	}

	let deliveryOption = document.getElementsByClassName('delivery-option')
	for (let i = 0; i < deliveryOption.length; i++) {
		deliveryOption[i].addEventListener('click', delivery)
	}

	let purchaseButton = document.getElementById('cart-buy-button')
	purchaseButton.addEventListener('click', purchaseItems)

	let closeModalButton = document.getElementsByClassName('btn-secondary')[0]
	closeModalButton.addEventListener('click', closeModal)

	let confirmButton = document.getElementsByClassName('confirm-buy')[0]
	confirmButton.addEventListener('click', confirmOrder)

	let clearCart = document.getElementById('cart-clear')
	clearCart.addEventListener('click', removeCartItems)
}

// clear cart
function removeCartItems(event) {
	if (sessionStorage.itemName) {
		let check = confirm('Are You Sure You Want To Clear Your Cart?')
		if (check) {
			sessionStorage.clear()
			window.location.href = '../html/checkout.html'
		}
	} else {
		alert('There Are No Items In Your Cart')
	}
}

// cart-item input value
function changeItemInput(e) {
	let input = e.target
	if (isNaN(input.value) || input.value < 2) {
		input.value = 1
		//console.log()
		cartTotal()
	} else {
		input.value
		//console.log()
		cartTotal()
	}
}

// declare global variables
let name = ''
let price = ''
let image = ''

function clickAddToCart(event) {
	// event.target = element that triggered the event
	let button = event.target

	// let addToCart = event.target's parentElement
	let addToCart = button.parentElement

	let itemName = addToCart.getElementsByClassName('store-item-name')[0]
		.innerText
	// if sessionStorage contains data
	if (sessionStorage.itemName) {
		// name variable is globally defined
		name = JSON.parse(sessionStorage.itemName)
		// push the itemName.innerText to the back of [name] array
		name.push(itemName)
		// stringify the [name] array
		sessionStorage.itemName = JSON.stringify(name)
	} else {
		// if sessionStorage doesn't contain data, create the [name] array
		name = []
		name.push(itemName)
		sessionStorage.itemName = JSON.stringify(name)
	}

	let itemPrice = addToCart.getElementsByClassName('store-item-price')[0]
		.innerText
	// if sessionStorage contains data
	if (sessionStorage.itemPrice) {
		// price variable is globally defined
		price = JSON.parse(sessionStorage.itemPrice)
		// push the itemPrice.innerText to the back of [price] array
		price.push(itemPrice)
		// stringify the [price] array
		sessionStorage.itemPrice = JSON.stringify(price)
	} else {
		// if sessionStorage doesn't contain data, create the [price] array
		price = []
		price.push(itemPrice)
		sessionStorage.itemPrice = JSON.stringify(price)
	}

	let imageSrc = addToCart.getElementsByClassName('store-image')[0].src
	// if sessionStorage contains data
	if (sessionStorage.imageSrc) {
		// image variable is globally defined
		image = JSON.parse(sessionStorage.imageSrc)
		// push the imageSrc.src to the back of [image] array
		image.push(imageSrc)
		// stringify the [image] array
		sessionStorage.imageSrc = JSON.stringify(image)
	} else {
		// if sessionStorage doesn't contain data, create the [image] array
		image = []
		image.push(imageSrc)
		sessionStorage.imageSrc = JSON.stringify(image)
	}

	// alert the total and item that was added to the cart
	alert(`The ${itemName} Has Been Added To Your Cart`)
	window.location.href = '../html/checkout.html'
}

function cartShowItems() {
	// if sessionStorage contains data
	if (
		sessionStorage.itemName &&
		sessionStorage.itemPrice &&
		sessionStorage.imageSrc
	) {
		let name = JSON.parse(sessionStorage.itemName)
		let price = JSON.parse(sessionStorage.itemPrice)
		let image = JSON.parse(sessionStorage.imageSrc)
		// get the <div> element where the data will be appended
		let showCartItems = document.getElementsByClassName(
			'show-cart-items'
		)[0]

		// for loop, to loop through the items in the array
		for (let i = 0; i < name.length; i++) {
			// create <div>
			let cartItemGrid = document.createElement('div')
			// add class to <div>
			cartItemGrid.classList.add('cart-item-grid')

			// data that will be the innerHTML of the created <div>
			let cartItemDisplay = ` 
            <div class="cart-item cart-item-flex">
                <img class="cart-item-image" src="${image[i]}" width="150" height="100">
                <span class="cart-item-title">${name[i]}</span>
            </div>
            <div class="cart-item-flex">
                <span class="cart-item-price">${price[i]}</span>
            </div>
            <div class="cart-item-quantity cart-item-flex">
                <input class="cart-quantity-input" type="number" value="1">
            </div> `

			// add cartItemDisplay's content as the innerHTML of cartItemGrid
			cartItemGrid.innerHTML = cartItemDisplay
			// append cartItemGrid to showCartItems
			showCartItems.appendChild(cartItemGrid)
		}
	} else {
		let showCartItems = document.getElementsByClassName(
			'show-cart-items'
		)[0]
		// placeholder text in case no item added to cart yet
		showCartItems.innerHTML = `There Are Currently No Items In Your Cart.`
		// style the placeholder text
		showCartItems.style.textAlign = 'center'
		showCartItems.style.fontFamily = 'Lexend Deca'
		showCartItems.style.fontSize = '20px'
		showCartItems.style.fontWeight = 'bold'
		showCartItems.style.color = 'white'
		showCartItems.style.backgroundColor = 'black'
		showCartItems.style.opacity = 0.9
		showCartItems.style.marginTop = '20px'
	}
}
cartShowItems()

// create a dropdown menu for nav-bar-item "CONNECT"
function navItemDisplay() {
	let navBarItem = document.getElementById('nav-bar-item')
	let navConnect = document.getElementById('nav-connect')

	// show the child elements
	navBarItem.addEventListener('mouseover', function () {
		navConnect.style.display = 'block'
	})
	// hide the child elements
	navBarItem.addEventListener('mouseleave', function () {
		navConnect.style.display = 'none'
	})
}
navItemDisplay()

// toggle the display of item-details and store-item-description
function storeItemDisplay() {
	let storeImage = document.getElementsByClassName('store-image')

	// toggle the display of item-details
	for (let i = 0; i < storeImage.length; i++) {
		storeImage[i].addEventListener('click', function () {
			let itemDetails =
				storeImage[i].previousElementSibling.previousElementSibling
			// show the item-details element
			if (itemDetails.style.display === 'none') {
				itemDetails.style.display = 'block'
				// hide the item-details element
			} else {
				itemDetails.style.display = 'none'
			}
		})
	}

	// toggle the display of store-item-description
	for (let i = 0; i < storeImage.length; i++) {
		storeImage[i].addEventListener('click', function () {
			let storeItemDescription = storeImage[i].previousElementSibling
			// hide the store-item-description element
			if (storeItemDescription.style.display === 'block') {
				storeItemDescription.style.display = 'none'
				// show the store-item-description element
			} else {
				storeItemDescription.style.display = 'block'
			}
		})
	}
}
storeItemDisplay()

// close modal, open cart page
function closeModal() {
	let closeModal = document.getElementsByClassName('modal')[0]
	closeModal.style.display = 'none'
}

// default back to home page
function confirmOrder() {
	// new Date().getTime used to generate unique reference number
	alert(
		`Payment Successful.\nYour Reference Number is ${new Date().getTime()}`
	)
	sessionStorage.clear()
	window.location.href = '../html/home.html'
}

// when click on purchase on cart page
function purchaseItems() {
	// check for atleast one sessionStorage object
	if (sessionStorage.itemName) {
		let openModal = document.getElementsByClassName('modal')[0]
		openModal.style.display = 'block'
		grandTotal()
	} else {
		alert('Please Add An Item To Your Cart.')
		window.location.href = '../html/store.html'
	}
}

// gets called at the top of the page @ grabElements()
function discount(event) {
	let discount = event.target
	let value = parseInt(discount.value)
	sessionStorage.setItem('discountValue', JSON.stringify(value))

	let parent = discount.parentElement
	let remove = parent.getElementsByClassName('discount-voucher')

	for (let i = 0; i < remove.length; i++) {
		remove[i].classList.remove('btn-success')
		remove[i].classList.add('btn-light')
	}
	if (discount.innerText === 'No Voucher') {
		alert('Next Time!')
		discount.classList.remove('btn-light')
		discount.classList.add('btn-success')
		grandTotal()
	} else {
		let check = prompt('Please Enter Your Discount Reference')
		if (check != null) {
			discount.classList.remove('btn-light')
			discount.classList.add('btn-success')
			grandTotal()
		} else {
			grandTotal()
		}
	}
}

// gets called at the top of the page @ grabElements()
function delivery(event) {
	let delivery = event.target
	let value = parseInt(delivery.value)
	sessionStorage.setItem('deliveryValue', JSON.stringify(value))

	let parent = delivery.parentElement
	let remove = parent.getElementsByClassName('delivery-option')

	for (let i = 0; i < remove.length; i++) {
		remove[i].classList.remove('btn-success')
		remove[i].classList.add('btn-light')
	}

	delivery.classList.remove('btn-light')
	delivery.classList.add('btn-success')

	if (delivery.innerText === 'Collection: Free of Charge') {
		alert('We Will See You Soon!')
		grandTotal()
	} else if (delivery.innerText === 'Standard Delivery: R50') {
		alert("Within A Week, You'll Start Playing.")
		grandTotal()
	} else {
		alert('Tomorrow Your Life Changes!')
		grandTotal()
	}
}

function grandTotal() {
	let modalPrice = document.getElementById('cart-modal-price')
	let modalTotalPrice = document.getElementById('grand-total')
	let discountValue = JSON.parse(sessionStorage.getItem('discountValue'))
	let deliveryValue = JSON.parse(sessionStorage.getItem('deliveryValue'))
	let price = JSON.parse(sessionStorage.getItem('total'))
	let realPrice = price - discountValue + deliveryValue
	let fixPrice = realPrice.toFixed(2)
	let total = fixPrice * 1.15
	let finalTotal = total.toFixed(2)

	modalPrice.innerHTML = `R ${fixPrice}`
	modalTotalPrice.innerHTML = `R ${finalTotal}`
}

// add total to cart page, if item has been added
function cartTotal() {
	//let quantity = JSON.parse(sessionStorage.getItem("quantity"))
	let cartTotalPrice = document.getElementById('cart-total-price')
	let itemGrid = document.getElementsByClassName('cart-item-grid')
	let total = 0
	//console.log()
	//console.log(typeof())
	for (let i = 0; i < itemGrid.length; i++) {
		let item = itemGrid[i]
		let price = item.getElementsByClassName('cart-item-price')[0].innerText
		//console.log(price)
		let intPrice = parseInt(price.replace('R', '').replace(/ /g, ''))
		//console.log()
		let amount = item.getElementsByClassName('cart-quantity-input')[0]
		/*for (let i = 0; i < amount.length; i++) {
        	let count = sessionStorage.setItem("count", amount[i])
        }*/
		let quantity = amount.value
		//console.log(quantity)
		let totalPrice = intPrice * quantity
		//console.log(totalPrice)
		total = total + totalPrice
		//console.log(total)
		cartTotalPrice.innerHTML = `R ${total}`
	}

	sessionStorage.setItem('total', JSON.stringify(total))
}
cartTotal()
