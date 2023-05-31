
function switchtype(index) {
	let node = document.getElementById(index);
	if (node.childNodes[5].style.display == "none") {
		node.childNodes[5].style.display = "";
		node.childNodes[3].style.display = "none";
	} else {
		node.childNodes[3].style.display = "";
		node.childNodes[5].style.display = "none";
	}
}
function sethigh(index) {
	let ind = cells.indexOf(index);
	if (ind > 0) {
		let a = cells[ind-1];
		cells[ind-1] = index;
		cells[ind] = a;
		document.getElementById(a).before(document.getElementById(index));
		update();
	} else {
		return;
	}
}
function setlow(index) {
	let ind = cells.indexOf(index);
	if (ind < cells.length-1) {
		let a = cells[ind+1];
		cells[ind+1] = index;
		cells[ind] = a;
		document.getElementById(a).after(document.getElementById(index));
		update();
	} else {
		return;
	}
}
function addcell() {
	let new_cell = document.getElementById('cell0').cloneNode(true);
	let cell_id = "cell"+(cells.length+1);
	new_cell.id = cell_id;
	// new_cell.childNodes[1].innerHTML += cells.length;
	cells.push(cell_id);
	document.getElementById("addbtn").before(new_cell);
	new_cell.style.display = "";
	// alert(new_cell.childNodes[7].innerHTML);
	update();
}
function remove(index) {
	document.getElementById(index).remove();
	cells.splice(cells.indexOf(index), 1);
	console.log(cells);
}
function start() {
    planner = document.getElementById("planner");
	screen = document.getElementById("trainer");
	planner.style.display = "none";
	screen.style.display = "";
	var clock = document.getElementById("countdown");
	var timer = document.getElementById("timer");
	var quantifier = document.getElementById("quantifier");
	clock.innerHTML = 4;
	
	function updateCountdown() {
		var t = clock.innerHTML;
		clock.innerHTML -= 1;
 
		if (t <= 1) {
			destroyCountdown();
			startCurrentTrain();
		}
	}
	function destroyCountdown() {
		clearInterval(timeinterval);
		clock.style.display = "none";
	}
	
	function initialiseTimer(time, msg) {
		timer.style.display = "";
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		document.getElementById("tmrmin").innerHTML = minutes;
		document.getElementById("tmrsec").innerHTML = seconds;
		document.getElementById("tmrmsg").innerHTML = msg;
		timeinterval = setInterval(updateTimer, 1000);
	}
	function updateTimer() {
		// let minutes = ;
		let seconds = document.getElementById("tmrsec");
		if (seconds.innerHTML <= 0){
			let minutes = document.getElementById("tmrmin");
			if (minutes.innerHTML <= 0){
				destroyTimer();
				startCurrentTrain();
				return;
			}
			minutes.innerHTML = ("0" + String(Number(minutes.innerHTML) - 1)).slice(-2);
			seconds.innerHTML = 60;
		}
		seconds.innerHTML = ("0" + String(Number(seconds.innerHTML) - 1)).slice(-2);
	}
	function destroyTimer() {
		clearInterval(timeinterval);
		timer.style.display = "none";
	}
	
	function initialiseQuantifier(msg){
		document.getElementById("quantifier").innerHTML = msg;
		touched = false;
		timeinterval = setInterval(updateQuantifier, 500);
		quantifier.style.display = "";
	}
	function updateQuantifier() {
		// beep
		if (touched) {
			destroyQuantifier();
			startCurrentTrain();
		}
	}	
	function destroyQuantifier() {
		clearInterval(timeinterval);
		quantifier.style.display = "none";
	}
	function startCurrentTrain() {
		if (currentTrain < cells.length){
			let cell = document.getElementById(cells[currentTrain]);
			if (cell.childNodes[3].style.display == "none") {
				initialiseQuantifier(cell.childNodes[1].innerHTML);
			} else {
				initialiseTimer(cell.querySelector(".traintime").value, cell.childNodes[1].innerHTML);
			}
			currentTrain += 1;
		} else {
			end();
		}
	}
 
	updateCountdown();
	var timeinterval = setInterval(updateCountdown, 1000);
}

function end() {
	planner.style.display = "";
	screen.style.display = "none";	
	currentTrain = 0;
}

function clear() {
	
}
function update() {
	// console.log(cells);
}
function skip() {
	touched = true;
}
var touched = false;
var currentTrain = 0;
var planner = document.getElementById("planner");
var screen = document.getElementById("trainer");
console.log(planner, screen);

var cells = [];






