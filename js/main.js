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
    document.querySelector('section').innerHTML = ""
    const hanja_dict = await load_dict(db_url)
    percent = Math.random()
    const index = Math.round(hanja_dict.length * percent)
    display_hanja_info(hanja_dict[index])
}

function display_hanja_info(hanja) {
    const section = document.querySelector('section')

    const p_char = document.createElement('p')
    const p_names = document.createElement('p')
    const p_definitions = document.createElement('p')

    p_char.textContent = hanja.character
    p_names.textContent = hanja.names
    p_definitions.textContent = hanja.definitions

    section.appendChild(p_char)
    section.appendChild(p_names)
    section.appendChild(p_definitions)
}


// DICTIONARY
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
    document.querySelector('section').innerHTML = ""

    const hanja_dict = await load_dict(db_url)
    const readings = get_unique_readings(hanja_dict)

    const hangeul_index = document.querySelector('section')

    // var hangeul_index = document.createElement("section")
    const alphabet = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하']

    var current_alphabet = document.createElement("details")
    // current_alphabet.setAttribute("class", "collapsible")
    var alphabet_summary = document.createElement("summary")
    alphabet_summary.textContent = alphabet[0]
    current_alphabet.appendChild(alphabet_summary)
    // hangeul_index.appendChild(current_alphabet)
    current_alphabet_index = 0
    for (const element of readings) {
        if (element) { // there's an undefined...

            // check if we've moved to next consonant
            if (current_alphabet_index+1 < alphabet.length && element >= alphabet[current_alphabet_index+1]) {
                hangeul_index.appendChild(current_alphabet)
                current_alphabet_index += 1
                // current_alphabet = document.createElement("heading")
                alphabet_summary = document.createElement("summary")
                alphabet_summary.textContent = alphabet[current_alphabet_index]
                current_alphabet = document.createElement("details")
                current_alphabet.appendChild(alphabet_summary)
            }

            console.log("adding button")
            var dict_button = document.createElement('button')
            dict_button.textContent = element
            current_alphabet.appendChild(dict_button)
            current_alphabet.appendChild(document.createElement("br"))
        }
    }
}


// MAIN
function main() {
    // ...not much to see here
}