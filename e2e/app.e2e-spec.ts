import { MuzykaPage } from './app.po';

describe('muzyka App', function() {
  let page: MuzykaPage;

  beforeEach(() => {
    page = new MuzykaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
