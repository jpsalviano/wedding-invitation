console.log("Guê, eu te amo!")

const navLinks = document.querySelectorAll('nav a');

for (const link of navLinks) {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const navigationIcon = document.querySelector('.navigation-icon');
const heroSection = document.getElementById('hero');

const handleScroll = () => {
  const scrollY = window.scrollY;
  if (scrollY > 400) {
    navigationIcon.style.display = 'block';
  } else {
    navigationIcon.style.display = 'none';
  }
};

window.addEventListener('scroll', handleScroll);

navigationIcon.addEventListener('click', (event) => {
  event.preventDefault();
  const targetId = event.target.parentElement.getAttribute('href').slice(1);
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

if (heroSection.offsetTop > 0) {
  navigationIcon.style.display = 'block';
} else {
  navigationIcon.style.display = 'none';
}
