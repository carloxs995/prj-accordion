class Accordion {

  constructor(a) {
    this.container = a.container; //Required
    this.mainTitle = a.mainTitle;
    this.panels = a.panels; //Required lenght >= 1 and title on single Accordion

    this.render();
  }

  static changeVisibilityContent(event) {
    const target = event.target;
    const parentEl = target.closest('.single-accordion');

    if (event.target.innerText === 'keyboard_arrow_down') {
      parentEl.classList.add('show');
      target.innerText = 'keyboard_arrow_up';
    } else {
      parentEl.classList.remove('show');
      target.innerText = 'keyboard_arrow_down';
    }
  }

  render() {

    if (!this.checkSettings())
      return;

    this.setClassOnContainer();

    this.setMainTitleBox();

    this.setAccordionList();
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
    if (!this.mainTitle)
      return;

    const box = document.createElement('div');
    box.className = 'accordion-container__main-title';

    const title = document.createElement('span');
    title.innerText = this.mainTitle;

    box.appendChild(title);
    document.getElementById(this.container).appendChild(box);
  }

  setAccordionList() {
    const accordionList = document.createElement('div');
    accordionList.className = 'accordion-container__accordion-list';

    this.panels.map(p => accordionList.appendChild(this.createSinglePanel(p)));

    document.getElementById(this.container).appendChild(accordionList);
  }

  createSinglePanel(panel) {
    //Setting props of single pannel
    const title = panel.title; // required
    const subtitle = panel.subtitle ? panel.subtitle : null;
    const content = panel.content ? panel.content : null;

    const singleAccordion = document.createElement('div');
    singleAccordion.className = 'single-accordion';

    const header = document.createElement('div');
    header.className = 'accordion-header';

    singleAccordion.appendChild(header);

    const mainInfoAccordion = document.createElement('span');
    mainInfoAccordion.className = 'main-info-accordion';

    header.appendChild(mainInfoAccordion);

    const titleAccordion = document.createElement('span');
    titleAccordion.innerText = title;
    titleAccordion.className = 'title';

    mainInfoAccordion.appendChild(titleAccordion);

    if (subtitle) {
      const subtitleAccordion = document.createElement('span');
      subtitleAccordion.innerText = subtitle;
      subtitleAccordion.className = 'desc';

      mainInfoAccordion.appendChild(subtitleAccordion);
    }

    const arrowSection = document.createElement('span');
    arrowSection.className = 'arrow';

    header.appendChild(arrowSection);

    const arrowDown = document.createElement('i');
    arrowDown.className = 'material-icons';
    arrowDown.innerText = 'keyboard_arrow_down';
    arrowDown.setAttribute('onclick', 'Accordion.changeVisibilityContent(event)');

    arrowSection.appendChild(arrowDown);

    if (content) {
      const contentAccordion = document.createElement('div');
      contentAccordion.className = 'accordion-content';
      contentAccordion.innerHTML = content;

      singleAccordion.appendChild(contentAccordion);
    }

    return singleAccordion;
  }
}   