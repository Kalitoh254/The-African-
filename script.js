// Select the slider arrow and the slide-in menu elements
const sliderArrow = document.getElementById("slider-arrow");
const slideInMenu = document.getElementById("slide-in-menu");

// Function to toggle the visibility of the slide-in menu
sliderArrow.addEventListener("click", function () {
  if (slideInMenu.classList.contains("menu-hidden")) {
    // Slide the menu in
    slideInMenu.classList.remove("menu-hidden");
    slideInMenu.classList.add("menu-visible");
    sliderArrow.innerHTML = '&#x2190;'; // Arrow points left when the menu is visible
  } else {
    // Slide the menu out
    slideInMenu.classList.remove("menu-visible");
    slideInMenu.classList.add("menu-hidden");
    sliderArrow.innerHTML = '&#x2192;'; // Arrow points right when the menu is hidden
  }
});

// Animate Slogan Letter by Letter (Only Once on Page Load)
const sloganElement = document.getElementById("slogan");
const sloganText = "Unveiling the Heart of Africa.";
let letterIndex = 0;

// Function to animate the slogan
function animateSlogan() {
  if (letterIndex < sloganText.length) {
    sloganElement.textContent += sloganText[letterIndex];
    letterIndex++;
    setTimeout(animateSlogan, 150); // Adjust the speed of the animation as needed
  }
}

// Trigger the slogan animation when the page loads
window.addEventListener("load", animateSlogan);

// Fetch News (prioritizing African news first)
async function fetchNews() {
  const apiKey = '19c4e86501cf4837ad9f40c6b7abd311'; // Your API key
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById('news-feed').innerText = "Failed to load news. Please try again later.";
  }
}

// Function to display the news articles
function displayNews(articles) {
  const newsFeedContainer = document.getElementById('news-feed');
  newsFeedContainer.innerHTML = '';

  if (articles.length === 0) {
    newsFeedContainer.innerText = "No news articles available.";
    return;
  }

  // Loop through the articles and create elements for each one
  articles.forEach(news => {
    const article = document.createElement('div');
    article.classList.add('news-article');
    article.innerHTML = `
      <h3><a href="${news.url}" target="_blank">${news.title}</a></h3>
      <p>${news.description ? news.description : "Description not available."}</p>
      <a href="${news.url}" target="_blank">Read more</a>
    `;
    newsFeedContainer.appendChild(article);
  });
}

// Fetch news when the page loads
window.addEventListener("load", fetchNews);