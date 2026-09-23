const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

const copyButton = document.querySelector('#copy-citation');
const bibtex = document.querySelector('#bibtex');

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { rootMargin: '160px 0px', threshold: 0.15 },
);

document.querySelectorAll('.result-video').forEach((video) => videoObserver.observe(video));

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bibtex.textContent);
    copyButton.textContent = 'Copied';
    window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1800);
  } catch {
    copyButton.textContent = 'Select text';
  }
});
