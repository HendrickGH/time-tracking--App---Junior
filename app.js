const intervalsElements = [...document.querySelectorAll('.text-nav')];
const hoursElements = [...document.querySelectorAll('.hours')];
const prevHoursElements = [...document.querySelectorAll('.time-js')];
const everyTime = [...document.querySelectorAll('.every-time-js')];
const findActive = element => element.classList.contains('active');

const toggleClasses = (prev, next) => {
	prev.classList.remove('active');
	next.classList.add('active');
};

const setEachTime = (intervalsElements, cb, toggle, newElement) => {
	const prev = intervalsElements.findIndex(cb);
	toggle(intervalsElements[prev], newElement.target);
	getData(newElement.target);
};

const getData = async time => {
	const res = await fetch('data.json');
	const data = await res.json();

	//prettier-ignore
	const everyFewText = time.textContent === 'Daily' ? 'day' : time.textContent === 'Weekly' ? 'week' : 'month'

	const everyFew = time.textContent.toLowerCase();

	data.forEach((element, i) => {
		hoursElements[i].textContent = element.timeframes[everyFew].current + 'hrs';
		prevHoursElements[i].textContent = element.timeframes[everyFew].previous;
		everyTime[i].textContent = everyFewText;
	});
};
const setState = element =>
	element.addEventListener(
		'click',
		setEachTime.bind(this, intervalsElements, findActive, toggleClasses)
	);
const App = () => intervalsElements.forEach(setState);
App();
