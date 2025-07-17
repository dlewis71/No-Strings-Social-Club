document.addEventListener("DOMContentLoaded", function () {
  // ===== SMOOTH SCROLL =====
  const smoothLinks = document.querySelectorAll(".cf a[href^='#']");
  const headerOffset = 80;
  const scrollDuration = 1200;

  function smoothScrollTo(targetY, duration = scrollDuration) {
    const startY = window.scrollY;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    function scroll(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startY + distanceY * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(scroll);
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scroll);
  }

  smoothLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId.startsWith("#") || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const targetY = target.offsetTop - headerOffset;
        smoothScrollTo(targetY);
        history.pushState(null, null, targetId);
      }
    });
  });

  // ===== AUDIO PLAYER =====
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const audioPlaylist = document.getElementById("playlist");

  if (audioPlayer && audioSource && audioPlaylist) {
    const audioTracks = Array.from(audioPlaylist.getElementsByTagName("li"));

    function setActiveAudio(index) {
      audioTracks.forEach((track, i) => {
        track.style.fontWeight = i === index ? "bold" : "normal";
        track.style.color = i === index ? "#c94f7c" : "#333";
      });
    }

    audioTracks.forEach((track, i) => {
      track.addEventListener("click", () => {
        const src = track.getAttribute("data-src");
        if (src) {
          audioSource.src = src;
          audioPlayer.load();
          audioPlayer.play();
          setActiveAudio(i);
          audioPlayer.dataset.currentIndex = i;
        }
      });
    });

    audioPlayer.addEventListener("ended", () => {
      const currentIndex = parseInt(audioPlayer.dataset.currentIndex || "0", 10);
      const nextIndex = currentIndex + 1;
      if (nextIndex < audioTracks.length) {
        audioTracks[nextIndex].click();
      }
    });

    setActiveAudio(0);
    audioPlayer.dataset.currentIndex = 0;
  }

  // ===== LOGIN FORM =====
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = loginForm.querySelector("input[type='text']").value;
      alert(`Welcome, ${username}! (Login feature coming soon)`);
      loginForm.reset();
    });
  }

  // ===== MUSIC PLAYLIST LINKS REDIRECT TO YOUTUBE MUSIC CHANNEL =====
  const playlistLinks = document.querySelectorAll("#music-playlist a");

  playlistLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
    });
  });

  // ===== FRIEND ZONE CHAT FEATURE (fixed) =====
  const userList = document.querySelectorAll("#userList .chat-user");
  const chatTitle = document.getElementById("chatTitle");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  let currentRecipient = null;

  userList.forEach(user => {
    user.addEventListener("click", function (e) {
      e.preventDefault();
      currentRecipient = this.getAttribute("data-user");
      chatTitle.textContent = "Chatting with " + currentRecipient;
      chatInput.focus();
    });
  });

  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!currentRecipient) {
        alert("Please select a user to chat with.");
        return;
      }

      const messageText = chatInput.value.trim();
      if (messageText === "") return;

      const msg = document.createElement("div");
      msg.classList.add("sent-message");
      msg.textContent = `Message sent to ${currentRecipient}: "${messageText}"`;
      chatMessages.appendChild(msg);

      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }
});










