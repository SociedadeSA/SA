document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a, .dropdown-content a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const target = event.target.getAttribute('href').substring(1);
            const section = document.getElementById(target);
            if (section) {
                event.preventDefault();
                window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const themeToggleCheckbox = document.getElementById('theme-toggle');
    themeToggleCheckbox.addEventListener('change', function() {
        if (themeToggleCheckbox.checked) {
            document.body.style.backgroundImage = "url('/public/imagens/fundo/claro.avif')";
            document.body.style.color = '#000';
        } else {
            document.body.style.backgroundImage = "url('/public/imagens/fundo/Black.png')";
            document.body.style.color = '#fff';
        }
    });
});
