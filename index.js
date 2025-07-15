document.addEventListener("DOMContentLoaded", function () {
  const smoothLinks = document.querySelectorAll(".cf a[href^='#']");

  // Custom smooth scroll function
  function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    function scroll(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startY + distanceY * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    }

    // Easing function for smooth feel
    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scroll);
  }

  // Apply to all anchor links with hashes
  smoothLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        smoothScrollTo(target.offsetTop, 1200); // Duration in milliseconds
        history.pushState(null, null, targetId);
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const playlist = document.getElementById("playlist");
  const tracks = playlist.getElementsByTagName("li");

  function setActiveTrack(index) {
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].style.fontWeight = i === index ? "bold" : "normal";
    }
  }

  for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener("click", function () {
      const src = this.getAttribute("data-src");
      audioSource.src = src;
      audioPlayer.load();
      audioPlayer.play();
      setActiveTrack(i);
    });
  }

  setActiveTrack(0);
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = loginForm.querySelector("input[type='text']").value;
    alert(`Welcome, ${username}! (Login feature coming soon)`);
    loginForm.reset();
  });
});
