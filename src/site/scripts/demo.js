var demo = {
  init: function() {
    console.log('demo is initialized.'); 
    this.setupDemoClickEvents();
    this.bindBasicLayout();
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
  },
  bindBasicLayout: function() {
    console.log("bindBasicLayout");
    var basicControls = document.querySelector('.basic-controls');
    var workareaBasics = document.querySelector('.workarea-basics');
    basicControls.addEventListener('click', function(e) {
      var control = e.target.textContent;
      demo.removeModifierClass(workareaBasics);
      if (control === 'Static') {
        demo.mapClass(workareaBasics, control.toLowerCase());
      } else if (control === 'Relative') {
        demo.mapClass(workareaBasics, control.toLowerCase());
      } else if (control === 'Absolute') {
        demo.mapClass(workareaBasics, control.toLowerCase());
      } else if (control === 'Fixed') {
        demo.mapClass(workareaBasics, control.toLowerCase());
      }
    }.bind(demo));
  },
  mapClass: function(obj, classname) {
    Array.prototype.map.call(obj.children, function(item) {
      item.classList.add(classname);
    });
  },
  removeModifierClass: function(obj) {
    Array.prototype.map.call(obj.children, function(item) {
      var itemToRemove = item.classList[1];
      item.classList.remove(itemToRemove);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  demo.init();
});