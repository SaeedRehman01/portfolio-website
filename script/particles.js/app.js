/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } }, // reduced count
    color: { value: ["#ffffff", "#ff9999", "#99ff99", "#9999ff"] },
    shape: {
      type: ["circle", "triangle", "edge"],
      stroke: { width: 0, color: "#000" },
    },
    opacity: {
      value: 0.6,
      random: false,
      anim: { enable: true, speed: 1.5, opacity_min: 0.15, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 20, size_min: 0.3, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.35,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "window", // reduce expensive canvas-level detection
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 300, line_linked: { opacity: 0.9 } },
      bubble: { distance: 90, size: 24, duration: 1.5, opacity: 8, speed: 2 },
      repulse: { distance: 100 }, // shorter repulse radius
      push: { particles_nb: 3 },
      remove: { particles_nb: 1 },
    },
  },
  retina_detect: true, // keep retina enabled
  config_demo: {
    hide_card: false,
    background_color: "#eeeeee",
    background_image: "",
    background_position: "50% 50%",
    background_repeat: "no-repeat",
    background_size: "cover",
  },
});
