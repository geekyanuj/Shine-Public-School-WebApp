const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const cards = document.getElementsByClassName("card");

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "#192A56";
          }
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "#192A56";
          }
    }
    else {        
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "white";
          }
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);