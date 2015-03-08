var demo = {
  init: function() {
    console.log('demo is initialized.'); 
    this.setupDemoClickEvents();
  },
  setupDemoClickEvents: function() {
    var demoNav = document.querySelector('.demo-menu');
    var workarea = document.querySelector('.workarea');
    demoNav.addEventListener('click', function(e) {
      console.log(e.target.textContent);
      var menuItem = e.target.textContent;
      // clear out workarea
      if (menuItem === 'Layout Basics') {
        console.log('Layout Basics is selected');
        //workarea.querySelector('workarea-basics').classList.add('show');
      } else if (menuItem === 'Scaling Button') {
        console.log('Scaling Button is selected');
        //workarea.querySelector('workarea-scaling').classList.add('show');
      } else if (menuItem === 'Magic Numbers') {
        console.log('Magic Numbers is selected');
        //workarea.querySelector('workarea-magicnumbers').classList.add('show');
      }
    }.bind(demo));
  }, 
  clearWorkArea: function(workarea) {
    console.log(workarea);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  demo.init();
});