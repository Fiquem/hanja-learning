// QUIZ
function clear_or_create_answer_section() {
	let element = document.getElementById("quiz-answer-correct");

    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
    	console.log("correct answer exists - clearing")
        element.innerHTML = ""
        return element
    }

    element = document.getElementById("quiz-answer-wrong");

    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
    	console.log("wrong answer exists - clearing")
        element.innerHTML = ""
        return element
    }

    console.log("no answer exists - creating")
    return document.createElement('section')
}

async function display_answer(correct_or_wrong) {
	const quiz_section = document.getElementById('mcq-quiz-section')

    p_hanja = document.getElementById('mcq-quiz-hanja')
    correct_hanja = p_hanja.textContent
    hanja_obj = await get_hanja_given_character(correct_hanja)

    let answer_description_section = clear_or_create_answer_section()

    let answer_text = document.createElement("p")
    answer_description_section.appendChild(answer_text)

    // here is the difference in correct or wrong
    if (correct_or_wrong == 'correct') {
	    answer_description_section.setAttribute("class", "quiz-answer-correct")
	    answer_description_section.setAttribute("id", "quiz-answer-correct")
	    answer_text.textContent = "u win"
    } else if (correct_or_wrong == 'wrong') {
	    answer_description_section.setAttribute("class", "quiz-answer-wrong")
	    answer_description_section.setAttribute("id", "quiz-answer-wrong")
	    answer_text.textContent = "u lose :("
    } else {
    	console.log("answer is neither correct nor wrong so idk")
    }

    display_hanja_and_reading_inline(hanja_obj, answer_description_section)

    quiz_section.appendChild(answer_description_section)
}

function correct_answer(evt) {
	display_answer('correct')
}

function wrong_answer(evt) {
	display_answer('wrong')
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array
}

// async function basic_quiz_test() {
// 	const quiz_main = document.querySelector('main')
//     quiz_main.innerHTML = ""

//     win_button = document.createElement("button")
//     win_button.textContent = "click here to win"
//     win_button.addEventListener('click', correct_answer, false)
//     quiz_main.appendChild(win_button)
// }

// display hanja mcq
function display_hanja_MCQ(character, answer_buttons) {
	const quiz_main = document.querySelector('main')
    quiz_main.innerHTML = ""

	const question_section = document.createElement('section')
    question_section.setAttribute('id', 'mcq-quiz-section')
    question_section.setAttribute('class', 'mcq-quiz')

	const p_hanja = document.createElement('p')
    p_hanja.setAttribute('id', 'mcq-quiz-hanja')
    p_hanja.setAttribute('class', 'single-hanja-character')
    p_hanja.textContent = character

    const answers_section = document.createElement('p')
    answers_section.setAttribute('class', 'mcq-answers')

    for (var i = 0; i < answer_buttons.length; i++) {
    	answers_section.appendChild(answer_buttons[i])
    }

    question_section.appendChild(p_hanja)
    question_section.appendChild(answers_section)
    quiz_main.appendChild(question_section)
}

// hanja pronunciation quiz
async function hanja_pronunciation_quiz() {
	const hanja_dict = await load_dict()

    // get answer hanja
    percent = Math.random()
    const correct_index = Math.round(hanja_dict.length * percent)
    correct_hanja = hanja_dict[correct_index]
    correct_pronunciation = correct_hanja.pronunciation

    // set number of answers
    var num_answers = 3

    // get wrong choices
    wrong_ps = new Array(num_answers-1)
    for (var i = 0; i < wrong_ps.length; i++) {
    	wrong_ps[i] = correct_pronunciation
	    while(wrong_ps[i] == correct_pronunciation && wrong_ps.includes(wrong_ps[i])) {
		    let percent = Math.random()
		    let wrong_index = Math.round(hanja_dict.length * percent)
		    wrong_ps[i] = hanja_dict[wrong_index].pronunciation
	    }
	}

	// create answer buttons
	correct_button = document.createElement("button")
    correct_button.setAttribute('class', 'mcq-button')
	correct_button.textContent = correct_pronunciation
	correct_button.addEventListener('click', correct_answer, false)

	wrong_buttons = new Array(num_answers-1)
    for (var i = 0; i < wrong_buttons.length; i++) {
		wrong_buttons[i] = document.createElement("button")
    	wrong_buttons[i].setAttribute('class', 'mcq-button')
		wrong_buttons[i].textContent = wrong_ps[i]
		wrong_buttons[i].addEventListener('click', wrong_answer, false)
    }

    // prepare for display
    answer_buttons = [correct_button].concat(wrong_buttons)
    answer_buttons = shuffle(answer_buttons)

    // display
    display_hanja_MCQ(correct_hanja.character, answer_buttons)
}

// hanja name quiz
async function hanja_names_quiz() {
	const hanja_dict = await load_dict()

    // get answer hanja
    percent = Math.random()
    const correct_index = Math.round(hanja_dict.length * percent)
    correct_hanja = hanja_dict[correct_index]
    correct_names = correct_hanja.names

    // set number of answers
    var num_answers = 3

    // get wrong choices
    wrong_names = new Array(num_answers-1)
    for (var i = 0; i < wrong_names.length; i++) {
    	wrong_names[i] = correct_names
	    while(wrong_names[i] == correct_names && wrong_names.includes(wrong_names[i])) {
		    let percent = Math.random()
		    let wrong_index = Math.round(hanja_dict.length * percent)
		    wrong_names[i] = hanja_dict[wrong_index].names
	    }
	}

	// create answer buttons
	correct_button = document.createElement("button")
    correct_button.setAttribute('class', 'mcq-button')
	correct_button.textContent = format_names_and_defs(correct_names, "names", ",")
	correct_button.addEventListener('click', correct_answer, false)

	wrong_buttons = new Array(num_answers-1)
    for (var i = 0; i < wrong_buttons.length; i++) {
		wrong_buttons[i] = document.createElement("button")
    	wrong_buttons[i].setAttribute('class', 'mcq-button')
		wrong_buttons[i].textContent = format_names_and_defs(wrong_names[i], "names", ",")
		wrong_buttons[i].addEventListener('click', wrong_answer, false)
    }

    // prepare for display
    answer_buttons = [correct_button].concat(wrong_buttons)
    answer_buttons = shuffle(answer_buttons)

    // display
    display_hanja_MCQ(correct_hanja.character, answer_buttons)
}

// hanja definition quiz
async function hanja_definitions_quiz() {
	const hanja_dict = await load_dict()

    // get answer hanja
    percent = Math.random()
    const correct_index = Math.round(hanja_dict.length * percent)
    correct_hanja = hanja_dict[correct_index]
    correct_definitions = correct_hanja.definitions

    // set number of answers
    var num_answers = 3

    // get wrong choices
    wrong_ds = new Array(num_answers-1)
    for (var i = 0; i < wrong_ds.length; i++) {
    	wrong_ds[i] = correct_definitions
	    while(wrong_ds[i] == correct_definitions && wrong_ds.includes(wrong_ds[i])) {
		    let percent = Math.random()
		    let wrong_index = Math.round(hanja_dict.length * percent)
		    wrong_ds[i] = hanja_dict[wrong_index].definitions
	    }
	}

	// create answer buttons
	correct_button = document.createElement("button")
    correct_button.setAttribute('class', 'mcq-button')
	correct_button.textContent = format_names_and_defs(correct_definitions, "definitions", ";")
	correct_button.addEventListener('click', correct_answer, false)

	wrong_buttons = new Array(num_answers-1)
    for (var i = 0; i < wrong_buttons.length; i++) {
		wrong_buttons[i] = document.createElement("button")
    	wrong_buttons[i].setAttribute('class', 'mcq-button')
		wrong_buttons[i].textContent = format_names_and_defs(wrong_ds[i], "definitions", ";")
		wrong_buttons[i].addEventListener('click', wrong_answer, false)
    }

    // prepare for display
    answer_buttons = [correct_button].concat(wrong_buttons)
    answer_buttons = shuffle(answer_buttons)

    // display
    display_hanja_MCQ(correct_hanja.character, answer_buttons)
}

function display_quiz_menu() {
	const quiz_main = document.querySelector('main')
    quiz_main.innerHTML = ""

    let quiz_title = document.createElement("h1")
    quiz_title.textContent = "which quiz would u like?"
    quiz_main.appendChild(quiz_title)

    let quiz_options = document.createElement("section")
    quiz_options.setAttribute('class', 'quiz-section')
    quiz_main.appendChild(quiz_options)

    let num_quiz_types = 3
    let quiz_types = new Array(num_quiz_types)
    for (let i = 0; i < num_quiz_types; i++) {
    	quiz_types[i] = document.createElement("button")
    	quiz_types[i].setAttribute('class', 'quiz-button')
    	quiz_options.appendChild(quiz_types[i])
    	quiz_options.appendChild(document.createElement("br"))
    }

    quiz_types[0].textContent = "pronunciation"
    quiz_types[0].addEventListener('click', hanja_pronunciation_quiz, false)
    quiz_types[1].textContent = "names"
    quiz_types[1].addEventListener('click', hanja_names_quiz, false)
    quiz_types[2].textContent = "definitions"
    quiz_types[2].addEventListener('click', hanja_definitions_quiz, false)
}












