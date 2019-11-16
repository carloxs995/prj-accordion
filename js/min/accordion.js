"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Accordion =
/*#__PURE__*/
function () {
  function Accordion(a) {
    _classCallCheck(this, Accordion);

    this.container = a.container; //Required

    this.mainTitle = a.mainTitle;
    this.panels = a.panels; //Required lenght >= 1 and title on single Accordion

    this.render();
  }

  _createClass(Accordion, [{
    key: "render",
    value: function render() {
      if (!this.checkSettings()) return;
      this.setClassOnContainer();
      this.setMainTitleBox();
      this.setAccordionList();
    }
    /**
     * Check if setting insert by user are correct
     */

  }, {
    key: "checkSettings",
    value: function checkSettings() {
      try {
        if (!this.container) throw 'Container property is required';
        if (!this.panels.length) throw 'At least the insertion of an accordion is required';
        if (!this.panels.find(function (a) {
          return a.title && a.content;
        })) throw 'You must enter the title and content at least in an accordion';
        return true;
      } catch (e) {
        console.error(e);
      }
    }
    /**
     * Detect element on DOM where append the component and set a Class 
     */

  }, {
    key: "setClassOnContainer",
    value: function setClassOnContainer() {
      document.getElementById(this.container).className = 'accordion-container';
    }
    /**
     * Create main box with title if is setted
     */

  }, {
    key: "setMainTitleBox",
    value: function setMainTitleBox() {
      if (!this.mainTitle) return;
      var box = document.createElement('div');
      box.className = 'accordion-container__main-title';
      var title = document.createElement('h3');
      title.innerText = this.mainTitle;
      box.appendChild(title);
      document.getElementById(this.container).appendChild(box);
    }
  }, {
    key: "setAccordionList",
    value: function setAccordionList() {
      var _this = this;

      var accordionList = document.createElement('div');
      accordionList.className = 'accordion-container__accordion-list';
      this.panels.map(function (p) {
        return accordionList.appendChild(_this.createSinglePanel(p));
      });
      document.getElementById(this.container).appendChild(accordionList);
    }
  }, {
    key: "createSinglePanel",
    value: function createSinglePanel(panel) {
      //Setting props of single pannel
      var title = panel.title; // required

      var subtitle = panel.subtitle ? panel.subtitle : null;
      var content = panel.content ? panel.content : null;
      var singleAccordion = document.createElement('div');
      singleAccordion.className = 'accordion-panels__single-accordion';
      var header = document.createElement('div');
      header.className = 'accordion-header';
      singleAccordion.appendChild(header);
      var mainInfoAccordion = document.createElement('span');
      mainInfoAccordion.className = 'main-info-accordion';
      header.appendChild(mainInfoAccordion);
      var titleAccordion = document.createElement('span');
      titleAccordion.innerText = title;
      mainInfoAccordion.appendChild(titleAccordion);

      if (subtitle) {
        var subtitleAccordion = document.createElement('p');
        subtitleAccordion.innerText = subtitle;
        mainInfoAccordion.appendChild(subtitleAccordion);
      }

      var arrowSection = document.createElement('span');
      arrowSection.className = 'arrow';
      header.appendChild(arrowSection);
      var arrowDown = document.createElement('i');
      arrowDown.className = 'material-icons';
      arrowDown.innerText = 'keyboard_arrow_down';
      arrowDown.setAttribute('onclick', 'Accordion.changeVisibilityContent(event.target)');
      arrowSection.appendChild(arrowDown);

      if (content) {
        var contentAccordion = document.createElement('div');
        contentAccordion.className = 'accordion-content';
        contentAccordion.innerHTML = content;
        singleAccordion.appendChild(contentAccordion);
      }

      return singleAccordion;
    }
  }], [{
    key: "changeVisibilityContent",
    value: function changeVisibilityContent(event) {
      event.innerText = event.innerText === 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }
  }]);

  return Accordion;
}();