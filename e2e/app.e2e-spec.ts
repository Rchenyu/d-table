import { DTablePage } from './app.po';

describe('d-table App', () => {
  let page: DTablePage;

  beforeEach(() => {
    page = new DTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
