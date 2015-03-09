var demo = {
  init: function() {
    console.log('demo is initialized.'); 
    this.setupDemoClickEvents();
    this.bindBasicLayout();
    this.bindMagicText();
    this.bindScaleExample();
  },
  setupDemoClickEvents: function() {
    var demoNav = document.querySelector('.demo-menu');
    var workarea = document.querySelector('.workarea');
    demoNav.firstElementChild.classList.add('select');
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
      } else if (menuItem === 'Magic Text') {
        demo.clearWorkArea(workarea);
        workarea.querySelector('.workarea-magictext').classList.add('show');
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
    var basicControls = document.querySelector('.basic-controls');
    var workareaBasics = document.querySelector('.workarea-basics');
    basicControls.addEventListener('click', function(e) {
      var control = e.target.textContent;
      demo.removeModifierClass(workareaBasics);
      demo.mapClass(workareaBasics, control.toLowerCase());
    }.bind(demo));
  },
  bindMagicText: function() {
    var textControls = document.querySelector('.text-controls');
    var workareaMagicText = document.querySelector('.workarea-magictext');
    textControls.addEventListener('click', function(e) {
      var control = e.target.textContent.toLowerCase();
      if (control === 'reset') {
        demo.removeAllModifierClasses(workareaMagicText);
      } else {
        demo.mapClass(workareaMagicText, control);
      }
    }.bind(demo));
  },
  bindScaleExample: function() {
    var scalingControls = document.querySelector('.scaling-controls');
    var workareaScaling = document.querySelector('.workarea-scaling');
    scalingControls.addEventListener('click', function(e) {
      var control = e.target.textContent.toLowerCase();
      if (control === 'reset') {
        demo.removeScalingModifiers(workareaScaling);
      } else {
        demo.mapClassToButton(workareaScaling, control);
      }
    }.bind(demo)); 
  },
  mapClass: function(obj, classname) {
    Array.prototype.map.call(obj.children, function(item) {
      item.classList.toggle(classname);
    });
  },
  removeModifierClass: function(obj) {
    Array.prototype.map.call(obj.children, function(item) {
      var itemToRemove = item.classList[1];
      item.classList.remove(itemToRemove);
    });
  },
  removeAllModifierClasses: function(obj) {
    console.log('removeAllModifierClasses');
    Array.prototype.map.call(obj.children, function(item) {
      if (item.className.split(' ')[0] !== 'text-controls') {
        item.className = "";
      }
    });
  },
  removeScalingModifiers: function(obj) {
    Array.prototype.map.call(obj.children, function(item) {
      var button = item.querySelector('button');
      button.className = "";
    });
  },
  mapClassToButton: function(obj, classname) {
    Array.prototype.map.call(obj.children, function(item) {
      var button = item.querySelector('button');
      if (button !== null) {
        button.classList.toggle(classname);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  demo.init();
});