var demo = {
  init: function() {
    console.log('demo is initialized.'); 
    this.setupDemoClickEvents();
  },
  setupDemoClickEvents: function() {
    var demoNav = document.querySelector('.demo-menu');
    demoNav.addEventListener('click', function(e) {
      console.log(e.target);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  demo.init();
});