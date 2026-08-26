document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos de navegación y vistas
  const linkHome = document.getElementById('link-home');
  const linkCursos = document.getElementById('link-cursos');
  const btnVerCursosList = document.querySelectorAll('.view-courses-btn');

  const homeView = document.getElementById('home-view');
  const coursesView = document.getElementById('courses-view');

  // Función para mostrar la sección de Cursos
  function showCoursesView(e) {
    if (e) e.preventDefault();
    homeView.classList.add('hidden-view');
    coursesView.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Función para mostrar el Home (al hacer clic en el Logo)
  function showHomeView(e) {
    if (e) e.preventDefault();
    coursesView.classList.add('hidden-view');
    homeView.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Asignar eventos de clic para cambiar vistas
  if (linkCursos) linkCursos.addEventListener('click', showCoursesView);
  if (linkHome) linkHome.addEventListener('click', showHomeView);

  btnVerCursosList.forEach(btn => {
    btn.addEventListener('click', showCoursesView);
  });

  // 2. Lógica del Formulario
  const form = document.getElementById('courseRequestForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  const today = new Date().toISOString().split('T')[0];
  const targetDateInput = document.getElementById('targetDate');
  if (targetDateInput) {
    targetDateInput.setAttribute('min', today);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      feedback.className = 'form-feedback hidden';

      const courseName = document.getElementById('courseName').value.trim();
      const reason = document.getElementById('reason').value.trim();
      const targetDate = document.getElementById('targetDate').value;
      const email = document.getElementById('email').value.trim();

      if (!courseName || !reason || !targetDate || !email) {
        showFeedback('Por favor, completa todos los campos requeridos.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Envío real a través de EmailJS
      // REEMPLAZA 'TU_SERVICE_ID' y 'TU_TEMPLATE_ID' con tus datos reales
      emailjs.sendForm('service_087r4y8', 'template_123456', form)
        .then(() => {
          showFeedback('¡Solicitud enviada con éxito! El correo ha sido enviado a Roberto.', 'success');
          form.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
        }, (error) => {
          console.error('Error al enviar:', error);
          showFeedback('Hubo un error al enviar el correo. Inténtalo de nuevo.', 'error');
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
        });
    });
  }

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});