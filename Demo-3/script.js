// Get the card elements
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const createCardButton = document.querySelector('.create-card-button');

// Add event listener to flip button
const flipButton = document.querySelector('.flip-button');
flipButton.addEventListener('click', function() {
  cardContainer.classList.toggle('flip');
});

// Add event listener to form submission
const form = cardBack.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const summary = form.elements.summary.value;
  const name = form.elements.name.value;
  const date = form.elements.date.value;
  const frontText = `Summary: ${summary}<br>Name: ${name}<br>Date: ${date}`;
  cardFront.querySelector('p').innerHTML = frontText;
  cardContainer.classList.remove('flip'); // flip the card back to the front
});


// Add drag functionality to card
let isDragging = false;
let startX, startY, initialX, initialY, deltaX, deltaY;

cardContainer.addEventListener('mousedown', function(e) {
  startX = e.clientX;
  startY = e.clientY;
  isDragging = true;
  initialX = cardContainer.offsetLeft;
  initialY = cardContainer.offsetTop;
});

cardContainer.addEventListener('mouseup', function(e) {
  isDragging = false;
});

cardContainer.addEventListener('mousemove', function(e) {
  if (isDragging) {
    e.preventDefault();
    deltaX = e.clientX - startX;
    deltaY = e.clientY - startY;
    cardContainer.style.left = `${initialX + deltaX}px`;
    cardContainer.style.top = `${initialY + deltaY}px`;
  }
});

const colorButtons = document.querySelectorAll(".color-button");
colorButtons.forEach(button => {
  button.addEventListener("click", function() {
    const color = this.getAttribute("data-color");
    const cardContainer = this.parentNode.parentNode;
    const cardBack = cardContainer.querySelector(".card-back");
    cardContainer.style.backgroundColor = color;
    document.querySelector('.card-front').style.backgroundColor = color;
  });
});




createCardButton.addEventListener('click', () => {
  const newCardContainer = document.createElement('div');
  newCardContainer.classList.add('card-container');
  newCardContainer.style.position = 'relative'; // Set position to relative
  newCardContainer.style.top = '50px'; // Set top position to 50px
  newCardContainer.style.left = '50px'; // Set left position to 50px

  const newCard = document.createElement('div');
  newCard.classList.add('card', 'card-front');
  newCard.innerHTML = '<p>This is the front of the card</p><button class="flip-button">Flip</button>';

  const newCardBack = document.createElement('div');
  newCardBack.classList.add('card', 'card-back');
  newCardBack.innerHTML = '<form><label for="summary">Summary:</label><input type="text" id="summary" name="summary" placeholder="Enter summary..."><label for="name">Name:</label><input type="text" id="name" name="name" placeholder="Enter name..."><label for="date">Date:</label><input type="text" id="date" name="date" placeholder="Enter date..."><button type="submit">Save</button></form>';

  //Create color buttons for the new card
  const newColorButtons = document.createElement('div');
  newColorButtons.classList.add('color-buttons');
  newColorButtons.innerHTML = '<button class="color-button" data-color="red">Red</button><button class="color-button" data-color="blue">Blue</button><button class="color-button" data-color="green">Green</button>';

  newCardBack.appendChild(newColorButtons);
  newCardContainer.appendChild(newCard);
  newCardContainer.appendChild(newCardBack);

  cardContainer.parentNode.insertBefore(newCardContainer, cardContainer.nextSibling);

  // Add event listeners to the new card container
  newCardContainer.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
    initialX = newCardContainer.offsetLeft;
    initialY = newCardContainer.offsetTop;
  });

  newCardContainer.addEventListener('mouseup', function(e) {
    isDragging = false;
  });

  newCardContainer.addEventListener('mousemove', function(e) {
    if (isDragging) {
      e.preventDefault();
      deltaX = e.clientX - startX;
      deltaY = e.clientY - startY;
      newCardContainer.style.left = `${initialX + deltaX}px`;
      newCardContainer.style.top = `${initialY + deltaY}px`;
    }
  });

  // Add event listener to form submission for new card
  const newForm = newCardBack.querySelector('form');
  newForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const summary = newForm.elements.summary.value;
    const name = newForm.elements.name.value;
    const date = newForm.elements.date.value;
    const frontText = `Summary: ${summary}<br>Name: ${name}<br>Date: ${date}`;
    newCard.querySelector('p').innerHTML = frontText;
    newCardContainer.classList.remove('flip'); // flip the card back to the front
  });

  // Add event listener to flip button for new card
  const newFlipButton = newCard.querySelector('.flip-button');
  newFlipButton.addEventListener('click', function() {
    newCardContainer.classList.toggle('flip');
  });

  // Add event listeners to the new color buttons
  const newColor = newCardBack.querySelector(".color-buttons");
newColor.addEventListener("click", function(event) {
  if (event.target.classList.contains("color-button")) {
    const color = event.target.getAttribute("data-color");
    newCard.style.backgroundColor = color;
    newCardBack.style.backgroundColor = color;
  }
});
});

  


