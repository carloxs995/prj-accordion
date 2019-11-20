class Accordion {

  constructor(a) {
    this.container = a.container;
    this.mainTitle = a.mainTitle;
    this.panels = a.panels;

    this.render();
  }

  /**
   * Function that manages the visibility of the content
   * 
   * @param {} event
   */

  static changeVisibilityContent(event) {
    const target = event.target;
    const parentEl = target.closest('.single-accordion');
    const arrow = parentEl.querySelector('.material-icons');

    if (arrow.innerText === 'keyboard_arrow_down') {
      parentEl.classList.add('show');
      arrow.innerText = 'keyboard_arrow_up';
    } else {
      parentEl.classList.remove('show');
      arrow.innerText = 'keyboard_arrow_down';
    }
  }

  /**
   * Check if setting insert by user are correct
   */
  checkSettings() {
    try {
      if (!this.container)
        throw 'Container property is required';
      if (!document.getElementById(this.container))
        throw `You must created an element with ID: ${this.container}`;
      if (!this.panels.length)
        throw 'At least the insertion of an accordion is required';
      if (!this.panels.find(a => a.title && a.content))
        throw 'You must enter the title and content at least in an accordion';
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Detect element on DOM where append the component and set a Class 
   */
  setClassOnContainer() {
    document.getElementById(this.container).className = 'accordion-container';
  }

  /**
   * Create main box with title if is setted
   */
  setMainTitleBox() {

    const box = document.createElement('div');
    box.className = 'accordion-container__main-title';

    const title = document.createElement('span');
    title.innerText = this.mainTitle;
    title.className = 'title';

    box.appendChild(title);
    document.getElementById(this.container).appendChild(box);
  }

  /**
   * Create container of accordion list and generate single accordion
   */
  setAccordionList() {
    const accordionList = document.createElement('div');
    accordionList.className = 'accordion-container__accordion-list';

    //Create single accordion if content is setted
    this.panels.forEach(panel => {
      if (panel.content) {
        accordionList.appendChild(this.createSinglePanel(panel));
      }
    });

    document.getElementById(this.container).appendChild(accordionList);
  }

  /**
   * Generate single panel with property various
   * 
   * @param {*} panel 
   */
  createSinglePanel(panel) {
    //Setting props of single panel
    const title = panel.title; // required
    const subtitle = panel.subtitle ? panel.subtitle : null; //optional
    const content = panel.content; //optional

    //Create Container Single Accordion
    const singleAccordion = document.createElement('div');
    singleAccordion.className = 'single-accordion';

    //Set Header Accordion
    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.setAttribute('onclick', 'Accordion.changeVisibilityContent(event)');

    singleAccordion.appendChild(header);

    //Set main info on single accordion header

    const mainInfoAccordion = document.createElement('span');
    mainInfoAccordion.className = 'main-info-accordion';

    header.appendChild(mainInfoAccordion);

    //Create element for accordion title
    const titleAccordion = document.createElement('span');
    titleAccordion.innerText = title;
    titleAccordion.className = 'title';

    mainInfoAccordion.appendChild(titleAccordion);

    //If exist add subtitle on accordion
    if (subtitle) {
      const subtitleAccordion = document.createElement('span');
      subtitleAccordion.innerText = subtitle;
      subtitleAccordion.className = 'desc';

      mainInfoAccordion.appendChild(subtitleAccordion);
    }

    //Add Arrow to Accordion header
    const arrowSection = document.createElement('span');
    arrowSection.className = 'arrow';

    header.appendChild(arrowSection);

    const arrowDown = document.createElement('i');
    arrowDown.className = 'material-icons';
    arrowDown.innerText = 'keyboard_arrow_down';

    arrowSection.appendChild(arrowDown);

    //Add Content on Single Accordion
    const contentAccordion = document.createElement('div');
    contentAccordion.className = 'accordion-content';
    contentAccordion.innerHTML = content;

    singleAccordion.appendChild(contentAccordion);

    return singleAccordion;
  }

  render() {

    if (!this.checkSettings())
      return;

    this.setClassOnContainer();

    if (this.mainTitle) {
      this.setMainTitleBox();
    }

    this.setAccordionList();
  }
}   