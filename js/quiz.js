// QUIZ
async function correct_answer(evt) {
	const quiz_section = document.getElementById('mcq-quiz-section')

    p_hanja = document.getElementById('mcq-quiz-hanja')
    correct_hanja = p_hanja.textContent
    hanja_obj = await get_hanja_given_character(correct_hanja)

    const answer_description_section = document.createElement('section')
    answer_description_section.innerHTML = ""
    answer_description_section.setAttribute("class", "quiz-answer-correct")

    let win_text = document.createElement("p")
    win_text.textContent = "u win"
    answer_description_section.appendChild(win_text)

    display_hanja_and_reading_inline(hanja_obj, answer_description_section)

    quiz_section.appendChild(answer_description_section)
}

async function wrong_answer(evt) {
	const quiz_section = document.getElementById('mcq-quiz-section')

    p_hanja = document.getElementById('mcq-quiz-hanja')
    correct_hanja = p_hanja.textContent
    hanja_obj = await get_hanja_given_character(correct_hanja)

    const answer_description_section = document.createElement('section')
    answer_description_section.innerHTML = ""
    answer_description_section.setAttribute("class", "quiz-answer-wrong")

    let lose_text = document.createElement("p")
    lose_text.textContent = "u lose :("
    answer_description_section.appendChild(lose_text)

    display_hanja_and_reading_inline(hanja_obj, answer_description_section)

    quiz_section.appendChild(answer_description_section)
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array
}

async function basic_quiz_test() {
	const quiz_main = document.querySelector('main')
    quiz_main.innerHTML = ""

    win_button = document.createElement("button")
    win_button.textContent = "click here to win"
    win_button.addEventListener('click', correct_answer, false)
    quiz_main.appendChild(win_button)
}

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















