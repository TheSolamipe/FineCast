let slideIndex = 0; //declaring and assigning value to sliders index

const slideShow = ()=>{  //declaring a slideshow function
  const slide = document.getElementsByClassName('slider'); //getting the element to be animated
  for (var i = 0; i < slide.length; i++) { //iterating through the slides
    slide[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slide.length) {
    slideIndex = 1;
  }
  slide[slideIndex - 1].style.display = "block"; //displaying the current slide
  setTimeout(slideShow, 5000); //setting time delay for each slide showcase
};

slideShow(); //invoking the slideshow function
