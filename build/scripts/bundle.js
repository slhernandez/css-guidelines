(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);
