export class PeriscopePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('periscope-app h1')).getText();
  }
}
