// DICTIONARY

// display hanja inline in dictionary
function display_hanja_and_reading_inline(hanja, parent_element) {
    let hanja_p = document.createElement("p")
    let hanja_button = document.createElement("button")
    hanja_button.setAttribute("class", "hanja-text-button")
    hanja_button.textContent = hanja.character
    hanja_p.innerHTML = hanja_button.outerHTML + " - " + hanja.names
    parent_element.appendChild(hanja_p)
}

async function display_hanja_given_reading(evt) {
    // console.log("we made it")
    var reading = evt.currentTarget.textContent
    const hanja_dict = await load_dict()
    const display = document.querySelector('main')
    display.innerHTML = ""
    hangeul_title = document.createElement("heading")
    hangeul_title.textContent = reading
    display.appendChild(hangeul_title)

    for (var i = 0; i < hanja_dict.length; i++) {
        if (hanja_dict[i].pronunciation == reading) {
            display_hanja_and_reading_inline(hanja_dict[i], display)
        }
    }

    hanja_buttons = document.getElementsByClassName("hanja-text-button")
    hanja_buttons_array = Array.from(hanja_buttons)
    hanja_buttons_array.map(x => x.addEventListener('click', display_hanja_button_click, false))
}

async function display_hanja_given_stroke(evt) {
    // console.log("we made it")
    var stroke = evt.currentTarget.textContent
    const hanja_dict = await load_dict()
    const display = document.querySelector('main')
    display.innerHTML = ""
    hangeul_title = document.createElement("heading")
    hangeul_title.textContent = stroke
    display.appendChild(hangeul_title)

    for (var i = 0; i < hanja_dict.length; i++) {
        if (hanja_dict[i].stroke_count == stroke) {
            display_hanja_and_reading_inline(hanja_dict[i], display)
        }
    }
    hanja_buttons = document.getElementsByClassName("hanja-text-button")
    hanja_buttons_array = Array.from(hanja_buttons)
    hanja_buttons_array.map(x => x.addEventListener('click', display_hanja_button_click, false))
}

function get_unique_readings(hanja) {
    const all_readings = hanja.map(x => x.pronunciation)
    const reduced_readings = new Set(all_readings)
    return reduced_readings
}

async function display_dictionary() {
    const dictionary_index_main = document.querySelector('main')
    dictionary_index_main.innerHTML = ""


    // Sort by reading
    //

    // get hanja
    const hanja_dict = await load_dict()
    const readings = get_unique_readings(hanja_dict)

    const hangeul_index = document.createElement("div")
    hangeul_index.setAttribute("class", "dictionary-column")

    const alphabet = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하']

    var current_alphabet = document.createElement("details")
    current_alphabet.setAttribute("class", "dict-reading")
    var details_section = document.createElement("section")
    var alphabet_summary = document.createElement("summary")
    alphabet_summary.textContent = alphabet[0]
    current_alphabet.appendChild(alphabet_summary)
    current_alphabet_index = 0
    for (const element of readings) {
        if (element) { // there's an undefined...

            // check if we've moved to next consonant
            if (current_alphabet_index+1 < alphabet.length && element >= alphabet[current_alphabet_index+1]) {
                current_alphabet.appendChild(details_section)
                details_section = document.createElement("section")
                hangeul_index.appendChild(current_alphabet)
                current_alphabet_index += 1
                alphabet_summary = document.createElement("summary")
                alphabet_summary.textContent = alphabet[current_alphabet_index]
                current_alphabet = document.createElement("details")
                current_alphabet.setAttribute("class", "dict-reading")
                current_alphabet.appendChild(alphabet_summary)
            }

            var dict_button = document.createElement('button')
            dict_button.setAttribute("class", "dictionary-index-reading")
            dict_button.textContent = element
            // dict_button.addEventListener('click', display_hanja_given_reading, false)
            details_section.appendChild(dict_button)
            // current_alphabet.appendChild(document.createElement("br"))
        }
        current_alphabet.appendChild(details_section)
        hangeul_index.appendChild(current_alphabet)
    }


    // Sort by stroke count
    //
    const stroke_index = document.createElement("div")
    stroke_index.setAttribute("class", "dictionary-column")

    // 33 seems to be max I have so far, should dynamically check if I change database
    for (var i = 0; i < 33; i++) {
        let stroke_p = document.createElement("button")
        stroke_p.textContent = i+1
        // stroke_p.addEventListener('click', display_hanja_given_stroke, false)
        stroke_p.setAttribute("class", "dictionary-index-stroke")
        stroke_index.appendChild(stroke_p)
    }

    dictionary_index_main.innerHTML = `
        <div class="dictionary-row">
            <div class="dictionary-column">
                <div class="dictionary-row">by reading</div>
                <div class="dictionary-row">
                    ` + hangeul_index.innerHTML + `
                </div>
            </div>
            <div class="dictionary-column">
                <div class="dictionary-row">by stroke</div>
                <div class="dictionary-row">
                    ` + stroke_index.innerHTML + `
                </div>
            </div>
        </div>
    `

    // doing the above breaks eventlisteners so gotta add here
    // but tbh doing it a proper way is a pain
    reading_buttons = document.getElementsByClassName("dictionary-index-reading")
    reading_buttons_array = Array.from(reading_buttons)
    reading_buttons_array.map(x => x.addEventListener('click', display_hanja_given_reading, false))

    stroke_buttons = document.getElementsByClassName("dictionary-index-stroke")
    stroke_buttons_array = Array.from(stroke_buttons)
    stroke_buttons_array.map(x => x.addEventListener('click', display_hanja_given_stroke, false))
}