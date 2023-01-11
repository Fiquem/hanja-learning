var db_url = 'https://raw.githubusercontent.com/Fiquem/hanja-learning/main/js/hanja_definitions.json'

async function load_dict(url) {
    const request = new Request(url);
    const response = await fetch(request);
    const hanja_dict = await response.json();
    console.log(hanja_dict[0])
    return hanja_dict;
}

async function random_hanja() {
    percent = Math.random();
    const hanja_dict = await load_dict(db_url)
    const index = Math.round(hanja_dict.length * percent)
    document.querySelector('section').innerHTML = "";
    populate_section(hanja_dict[index])
}

function populate_section(hanja) {
    const section = document.querySelector('section');

    const p_char = document.createElement('p');
    const p_names = document.createElement('p');
    const p_definitions = document.createElement('p');

    p_char.textContent = hanja.character;
    p_names.textContent = hanja.names;
    p_definitions.textContent = hanja.definitions;

    section.appendChild(p_char);
    section.appendChild(p_names);
    section.appendChild(p_definitions);
}

async function populate() {
    const hanja_dict = await load_dict(db_url)
    populate_section(hanja_dict[0]);
}

function main() {
    console.log("Importing Hanja...");
    populate();
    console.log("Hanja imported.");
}