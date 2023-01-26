// RANDOM
async function load_random_hanja() {
    document.querySelector('main').innerHTML = ""
    const hanja_dict = await load_dict(db_url)
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