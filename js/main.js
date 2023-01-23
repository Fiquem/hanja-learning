var db_url = 'https://raw.githubusercontent.com/Fiquem/hanja-learning/main/js/hanja_definitions.json'


// RANDOM
async function load_dict(url) {
    const request = new Request(url)
    const response = await fetch(request)
    const hanja_dict = await response.json()
    // console.log(hanja_dict[0])
    return hanja_dict
}

async function load_random_hanja() {
    document.querySelector('main').innerHTML = ""
    const hanja_dict = await load_dict(db_url)
    percent = Math.random()
    const index = Math.round(hanja_dict.length * percent)
    display_hanja_info(hanja_dict[index])
}



// SHARED
function display_hanja_info(hanja) {
    const main = document.querySelector('main')

    const p_char = document.createElement('p')
    const p_names = document.createElement('p')
    const p_definitions = document.createElement('p')

    p_char.textContent = hanja.character
    p_names.textContent = hanja.names
    p_definitions.textContent = hanja.definitions

    main.appendChild(p_char)
    main.appendChild(p_names)
    main.appendChild(p_definitions)
}


// DICTIONARY
async function display_hanja_given_reading(evt) {
    // console.log("we made it")
    var reading = evt.currentTarget.textContent
    const hanja_dict = await load_dict(db_url)
    const display = document.querySelector('main')
    display.innerHTML = ""
    hangeul_title = document.createElement("heading")
    hangeul_title.textContent = reading
    display.appendChild(hangeul_title)

    for (var i = 0; i < hanja_dict.length; i++) {
        if (hanja_dict[i].pronunciation == reading) {
            let hanja_p = document.createElement("p")
            hanja_p.textContent = hanja_dict[i].character + " - " + hanja_dict[i].names
            display.appendChild(hanja_p)
        }
    }
}

function get_unique_readings(hanja) {
    // console.log("creating dictionary outline")
    // console.log(hanja.slice(10,40))
    const all_readings = hanja.map(x => x.pronunciation)
    // console.log(all_readings[0])
    const reduced_readings = new Set(all_readings)
    // console.log(reduced_readings)
    return reduced_readings
}

async function display_dictionary() {
    const hangeul_index = document.querySelector('main')
    hangeul_index.innerHTML = ""

    const hanja_dict = await load_dict(db_url)
    const readings = get_unique_readings(hanja_dict)

    const alphabet = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하']

    var current_alphabet = document.createElement("details")
    var alphabet_summary = document.createElement("summary")
    alphabet_summary.textContent = alphabet[0]
    current_alphabet.appendChild(alphabet_summary)
    current_alphabet_index = 0
    for (const element of readings) {
        if (element) { // there's an undefined...

            // check if we've moved to next consonant
            if (current_alphabet_index+1 < alphabet.length && element >= alphabet[current_alphabet_index+1]) {
                hangeul_index.appendChild(current_alphabet)
                current_alphabet_index += 1
                alphabet_summary = document.createElement("summary")
                alphabet_summary.textContent = alphabet[current_alphabet_index]
                current_alphabet = document.createElement("details")
                current_alphabet.appendChild(alphabet_summary)
            }

            console.log("adding button")
            var dict_button = document.createElement('button')
            dict_button.textContent = element
            dict_button.addEventListener('click', display_hanja_given_reading, false)
            current_alphabet.appendChild(dict_button)
            current_alphabet.appendChild(document.createElement("br"))
        }
        hangeul_index.appendChild(current_alphabet)
    }
}


// TEST
// async function test() {
//     document.querySelector('main').innerHTML = ""
//     const hanja_dict = await load_dict(db_url)
//     display_hanja_given_reading(hanja_dict, '가')
// }

// MAIN
function main() {
    // ...not much to see here
    // test()
}