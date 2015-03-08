var demo = {
  init: function() {
    console.log('demo is initialized.'); 
    this.setupDemoClickEvents();
  },
  setupDemoClickEvents: function() {
    var demoNav = document.querySelector('.demo-menu');
    var workarea = document.querySelector('.workarea');
    demoNav.addEventListener('click', function(e) {
      demo.clearNavSelection(demoNav);
      e.target.classList.add('select');
      var menuItem = e.target.textContent;
      // clear out workarea
      if (menuItem === 'Layout Basics') {
        demo.clearWorkArea(workarea);
        workarea.querySelector('.workarea-basics').classList.add('show');
      } else if (menuItem === 'Scaling Button') {
        demo.clearWorkArea(workarea);
        workarea.querySelector('.workarea-scaling').classList.add('show');
      } else if (menuItem === 'Magic Numbers') {
        demo.clearWorkArea(workarea);
        workarea.querySelector('.workarea-magicnumbers').classList.add('show');
      }
    }.bind(demo));
  }, 
  clearWorkArea: function(workarea) {
    Array.prototype.map.call(workarea.children, function(item) {
      item.classList.remove('show');
    });
  },
  clearNavSelection: function(nav) {
    Array.prototype.map.call(nav.children, function(item) {
      item.classList.remove('select');
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  demo.init();
});