---
---

/*!
 * Basically Basic Jekyll Theme 1.4.5
 * Copyright 2017-2018 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-theme-basically-basic/blob/master/LICENSE
 */

var menuItems = document.querySelectorAll("#sidebar li");

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp =
  typeof docElemStyle.transition == "string"
    ? "transition"
    : "WebkitTransition";

// Animate sidebar menu items
function animateMenuItems() {
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[transitionProp + "Delay"] = i * 75 + "ms";
    item.classList.toggle("is--moved");
  }
}

var myWrapper = document.querySelector(".wrapper");
var myMenu = document.querySelector(".sidebar");
var myToggle = document.querySelector(".toggle");
var myInitialContent = document.querySelector(".initial-content");
var mySearchContent = document.querySelector(".search-content");
var mySearchToggle = document.querySelector(".search-toggle");

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add("is--animatable");
  if (!myMenu.classList.contains("is--visible")) {
    myMenu.classList.add("is--visible");
    myToggle.classList.add("open");
    myWrapper.classList.add("is--pushed");
  } else {
    myMenu.classList.remove("is--visible");
    myToggle.classList.remove("open");
    myWrapper.classList.remove("is--pushed");
  }
}

// Animation smoother
function OnTransitionEnd() {
  myMenu.classList.remove("is--animatable");
}

myMenu.addEventListener("transitionend", OnTransitionEnd, false);
myToggle.addEventListener(
  "click",
  function () {
    toggleClassMenu();
    animateMenuItems();
  },
  false
);
myMenu.addEventListener(
  "click",
  function () {
    toggleClassMenu();
    animateMenuItems();
  },
  false
);
if (mySearchToggle) {
  mySearchToggle.addEventListener(
    "click",
    function () {
      toggleClassSearch();
    },
    false
  );
}

// Toggle search input and content visibility
function toggleClassSearch() {
  mySearchContent.classList.toggle("is--visible");
  myInitialContent.classList.toggle("is--hidden");
  setTimeout(function () {
    document.querySelector(".search-content input").focus();
  }, 400);
}

// Control the visibility of navbar and back-to-top link based on the Y-axis
// scroll position (added by Jari)

let myNavbar = document.querySelector("#navbar");
let myBackToTop = document.querySelector("#btt-container");

let lastKnownScrollPosition = 0;
let scrollDirection = 0;
let ticking = false;
let navbarHideLimit = 100;
let bttShowLimit = window.innerHeight/3*2;

function controlNavbarVisibility(scrollDir, scrollPos) {
  if (scrollPos < navbarHideLimit) {
    myNavbar.classList.toggle("is--visible", true);
    myNavbar.classList.toggle("is--hidden", false);
    return;
  }
  if (
    scrollDir < 0 &&
    myNavbar.classList.contains("is--visible") &&
    scrollPos > navbarHideLimit
  ) {
    myNavbar.classList.toggle("is--visible");
    myNavbar.classList.toggle("is--hidden");
  } else if (scrollDir > 0 && myNavbar.classList.contains("is--hidden")) {
    myNavbar.classList.toggle("is--visible");
    myNavbar.classList.toggle("is--hidden");
  }
}

function controlBttVisibility(scrollPos) {
  if (scrollPos < bttShowLimit) {
    myBackToTop.classList.toggle("is--hidden", true);
    myBackToTop.classList.toggle("is--visible", false);
    return;
  }
  myBackToTop.classList.toggle("is--hidden", false);
  myBackToTop.classList.toggle("is--visible", true);
}

document.addEventListener("scroll", () => {
  scrollDirection = lastKnownScrollPosition - window.scrollY;
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      controlNavbarVisibility(scrollDirection, lastKnownScrollPosition);
      controlBttVisibility(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});
