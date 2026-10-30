/* Contact page (demo): validates the form and shows a thank-you message.
   The real submission is handled by Contact Form 7 on the WordPress site.
   Needs: #ct-form with #ct-name, #ct-email, #ct-phone, #ct-topic, and a #ct-status paragraph. */
(function () {
  var form = document.getElementById('ct-form');
  if (!form) return;
  var status = document.getElementById('ct-status');
  function show(text, ok) { status.textContent = text; status.className = 'ct-msg ' + (ok ? 'ok' : 'err'); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), phone = form.phone.value.replace(/[\s()+-]/g, ''), topic = form.topic.value;
    if (!name) return show('Please enter your name.', false);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show('Please enter a valid email address.', false);
    if (!/^\d{10,13}$/.test(phone)) return show('Please enter a valid mobile number.', false);
    if (!topic) return show('Please choose what you would like to talk about.', false);
    show('Thank you, ' + name.split(' ')[0] + '! We have received your message and will get back to you soon.', true);
    form.reset();
  });
})();
