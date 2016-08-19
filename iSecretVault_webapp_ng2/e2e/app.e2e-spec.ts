import { ISecretVaultWebappNg2Page } from './app.po';

describe('i-secret-vault-webapp-ng2 App', function() {
  let page: ISecretVaultWebappNg2Page;

  beforeEach(() => {
    page = new ISecretVaultWebappNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
