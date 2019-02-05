
window.addEventListener('DOMContentLoaded', function () {

	// Tab	
	let tab = document.querySelectorAll('.info-header-tab'),
	    info = document.querySelector('.info-header'),
	    tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if(tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		} 
	}

	info.addEventListener('click', function (evant) {
		let target = evant.target;

		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if(target == tab[i] ) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});



	// Timer 
	let deadline = '2019-02-09';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor(((t/1000) % 60)),
			minutes = Math.floor(((t)/1000/60) % 60),
			hours = Math.floor( (t)/1000/3600 );
			// hours = Math.floor(((time)/1000/3600));
			seconds >=0 && seconds<10? seconds= `0${seconds}`: seconds;
			minutes >=0 && minutes<10? minutes= `0${minutes}`: minutes;
			hours >=0 && hours<10? hours= `0${hours}`: hours;
			

			return {
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInteval = setInterval(undateClock, 1000);



		function undateClock() {
			let t = getTimeRemaining(endtime);
			hours.textContent = t.hours;
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInteval);
			}
		}
	}

	setClock('timer', deadline);


	// Modal 
	
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descriptionBtn = document.querySelectorAll('.description-btn');


	function showModalWindow() {
		overlay.style.display = 'block';
		this.classList.add('more-splas');
		document.body.style.overflow  = 'hidden';
	}

	more.addEventListener('click', showModalWindow);

	for ( let i = 0; i<descriptionBtn.length; i++ ) {
		descriptionBtn[i].addEventListener('click', showModalWindow)
	}

	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		more.classList.remove('more-splas');
		document.body.style.overflow  = '';
	});

	// Form 
	
	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	}

	let form = document.querySelector('.main-form'),
	formButtom = document.getElementById('form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

		statusMessage.classList.add('status');

	function sendForm(elem) {
		elem.addEventListener('submit', function (event) {
			event.preventDefault();
			elem.appendChild(statusMessage);

			let formData = new FormData(elem);

			function postData (data) {
				return new Promise( function (resolve, reject) {		
					let request = new XMLHttpRequest();

					request.open('POST', '../server.php');

					request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
					
					request.addEventListener('readystatechange', function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							resolve();
						} else {
							reject();
						}
					});

					request.send(data);
				});

				// End postData
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++ ) {
					input[i].value = '';
				}
			}

			postData(formData)
				.then(() => {
					statusMessage.innerHTML = message.loading;
				})
				then(() => {
					statusMessage.innerHTML = message.success;
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
		});
	}

	sendForm(form);
	sendForm(formButtom);


	// Slider 
	
	let slidIndex = 1;
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(slidIndex);

	function showSlides(n) {

		if (n > slides.length) {
			slidIndex = 1;
		}

		if (n < 1) {
			slidIndex = slides.length;
		}
		for (let i = 0; i< slides.length; i++) {
			slides[i].style.display = 'none';
			dots[i].classList.remove('dot-active');
		}
		/* В моем браузере почему-то не поддерживаеться метод forEach

		slides.forEach( item => item.style.display = 'none');
		dots.forEach( item => item.classList.remove('dot-active'));
		*/
		slides[slidIndex - 1].style.display = 'block';
		dots[slidIndex - 1].classList.add('dot-active');
	}

	function plusSlides (n) {
		showSlides(slidIndex += n);
	}

	function currentSlide (n) {
		showSlides(slidIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});

	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (event) {
		for (let i = 0; i < dots.length + 1; i++  ) {
			if (event.target.classList.contains('dot') && event.target == dots[i-1] ) {
			   currentSlide(i);
			}
		}
	});

	let timerId = setTimeout( function log(argument) {
		plusSlides(1);
		setTimeout(log, 7000)
	});


	// Calc
	
	let persons = document.querySelector('.counter-block-input'),
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;


		persons.addEventListener('change', function () {
			personsSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if (daysSum > 0 && personsSum > 0) {
				totalValue.innerHTML = total;
			} else {
				totalValue.innerHTML = 0;
			}
		})

		restDays.addEventListener('change', function () {
			daysSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if (daysSum > 0 && personsSum > 0) {
				totalValue.innerHTML = total;
			} else {
				totalValue.innerHTML = 0;
			}
		})

		place.addEventListener('change', function () {
			if (daysSum > 0 && personsSum > 0) {
				let a = total;
				totalValue.innerHTML = a * this.options[this.selectedIndex].value;
			} else {
				totalValue.innerHTML = 0;
			}
		})


});

