document.addEventListener("DOMContentLoaded", () => {
  // ===== SMOOTH SCROLL (simple beginner-friendly version) =====
  const navLinks = document.querySelectorAll(".cf a[href^='#']");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // prevent instant jump
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust for header height
          behavior: "smooth",         // smooth animation
        });
        history.pushState(null, null, targetId); // update URL
      }
    });
  });

  // ===== AUDIO PLAYER =====
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const audioPlaylist = document.getElementById("playlist");
  if (audioPlayer && audioSource && audioPlaylist) {
    const tracks = Array.from(audioPlaylist.getElementsByTagName("li"));
    function setActive(i) {
      tracks.forEach((t, idx) => {
        t.style.fontWeight = idx === i ? "bold" : "normal";
        t.style.color = idx === i ? "#c94f7c" : "#333";
      });
    }
    tracks.forEach((track, i) => {
      track.addEventListener("click", () => {
        const src = track.getAttribute("data-src");
        if (src) {
          audioSource.src = src;
          audioPlayer.load();
          audioPlayer.play();
          setActive(i);
          audioPlayer.dataset.currentIndex = i;
        }
      });
    });
    audioPlayer.addEventListener("ended", () => {
      let currentIndex = parseInt(audioPlayer.dataset.currentIndex || "0", 10);
      let nextIndex = currentIndex + 1;
      if (nextIndex < tracks.length) tracks[nextIndex].click();
    });
    setActive(0);
    audioPlayer.dataset.currentIndex = 0;
  }

  // ===== LOGIN FORM =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = loginForm.querySelector("input[type='text']").value;
      alert(`Welcome, ${username}! (Login feature coming soon)`);
      loginForm.reset();
    });
  }

  // ===== YOUTUBE MUSIC CHANNEL LINKS =====
  const playlistLinks = document.querySelectorAll("#music-playlist a");
  playlistLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
    });
  });

  // ===== FRIEND ZONE CHAT =====
  const userList = document.querySelectorAll("#userList li");
  const chatTitle = document.getElementById("chatTitle");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  let currentRecipient = null;
  userList.forEach(user => {
    user.addEventListener("click", e => {
      e.preventDefault();
      currentRecipient = user.getAttribute("data-user");
      chatTitle.textContent = `Chatting with ${currentRecipient}`;
      chatMessages.innerHTML = "";
      chatInput.focus();
    });
  });
  if (chatForm) {
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!currentRecipient) {
        alert("Please select a user to chat with.");
        return;
      }
      const message = chatInput.value.trim();
      if (message === "") return;
      const msg = document.createElement("div");
      msg.classList.add("sent-message");
      msg.textContent = `Message sent to ${currentRecipient}: "${message}"`;
      chatMessages.appendChild(msg);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  // ===== SIGNUP MODAL =====
  const modal = document.getElementById("signup-modal");
  const openModalBtn = document.getElementById("openSignup");
  const closeBtn = document.querySelector(".close");

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", e => {
      e.preventDefault();
      modal.style.display = "block";
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", e => {
      e.preventDefault();
      modal.style.display = "none";
    });
  }
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  if (modal) {
    const signupForm = modal.querySelector("form");
    if (signupForm) {
      signupForm.addEventListener("submit", e => {
        e.preventDefault();
        alert("Sign up form submitted!");
        signupForm.reset();
        modal.style.display = "none";
      });
    }
  }
});



