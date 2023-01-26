// SHARED
var db_url = 'https://raw.githubusercontent.com/Fiquem/hanja-learning/main/js/hanja_definitions.json'

async function load_dict() {
    url = db_url
    const request = new Request(url)
    const response = await fetch(request)
    const hanja_dict = await response.json()
    // console.log(hanja_dict[0])
    return hanja_dict
}

async function display_hanja_button_click(evt) {
    var hanja_char = evt.currentTarget.textContent // can't be doing other functions before currentTarget...
    // console.log("here?")
    const hanja_dict = await load_dict()
    var hanja_obj = ""
    var i = 0

    while (hanja_obj == "") {
        if (hanja_dict[i].character == hanja_char) {
            hanja_obj = hanja_dict[i]
        }
        i += 1
    }

    display_hanja_info(hanja_obj)
}

// helper function for hanja names/definitions display
function format_names_and_defs(unformatted_list, list_type, separator) {
    // console.log("formatting: " + unformatted_list)
    if (unformatted_list.length == 0) {
        return "(" + list_type + " missing)"
    } else if (unformatted_list.length == 1) {
        return unformatted_list
    } else {
        var definitions_string = unformatted_list[0]
        for (var i = 1; i < unformatted_list.length; i++) {
            definitions_string += separator + ' ' + unformatted_list[i]
        }
        return definitions_string
    }
}

// display used for single hanja shown on the screen, hanja info page
function display_hanja_info(hanja) {
    const main = document.querySelector('main')
    main.innerHTML = ""

    const hanja_section = document.createElement('section')
    hanja_section.setAttribute('class', 'single-hanja-display-block')
    const p_char = document.createElement('p')
    p_char.setAttribute('class', 'single-hanja-character')
    const p_names = document.createElement('p')
    const p_definitions = document.createElement('p')

    p_char.textContent = hanja.character
    p_names.textContent = format_names_and_defs(hanja.names, "names", ",")
    p_definitions.textContent = format_names_and_defs(hanja.definitions, "definitions", ";")

    hanja_section.appendChild(p_char)
    hanja_section.appendChild(p_names)
    hanja_section.appendChild(p_definitions)
    main.appendChild(hanja_section)
}

// RANDOM
async function load_random_hanja() {
    document.querySelector('main').innerHTML = ""
    const hanja_dict = await load_dict()
    percent = Math.random()
    const index = Math.round(hanja_dict.length * percent)
    display_hanja_info(hanja_dict[index])
}

// ABOUT
function about_me() {
    const main = document.querySelector('main')
    main.innerHTML = ""
    const sec = document.createElement('section')
    sec.setAttribute("class", "about-me")
    main.appendChild(sec)

    sec.innerHTML = `
        <p>Hello :)</p>
        <p>This is my project to make a little hanja info display app for learning. It's by no means exhaustive and honestly I can't verify that everything is correct, but I made it :)</p>
        <p>Actually, I can guarantee there are errors :)
        <p>Enjoy! :)</p>
        <p><a href="https://github.com/Fiquem/hanja-learning">View the GitHub repository!</a></p>`
}

// MAIN
function main() {
    // ...not much to see here
    // test()
}