
var Goeuro = function() {
  
  this.usernameInput = element(by.model('vm.username'));
  this.repositories = element.all(by.repeater('repository in vm.repositories'));
  this.error = element(by.binding('vm.error.message'));
  this.repositories_count = element(by.css('.repositories-count'));

  this.get = function() {
    browser.get('http://localhost:8000/');
  };

  this.setUsername = function(name) {
    this.usernameInput.sendKeys(name);
  };

  this.getError = function() {
    return this.error.getText();
  };
};

describe('GoEuro', function() {

  var goeuro = new Goeuro();

  beforeEach(function() {
    browser.get('http://localhost:8000/');
  });

  it('should get 6 repositories', function() {
    
    goeuro.setUsername('faouzicaptivo');
    expect(goeuro.repositories.count()).toEqual(6);
    expect(goeuro.repositories_count.getText()).toEqual('6 Repositories.');

  });

  it('should get empty result', function() {

    goeuro.usernameInput.clear();
    expect(goeuro.repositories.count()).toEqual(0);
    expect(goeuro.getError()).toEqual('Find people repositories on Github.');

  });

    it('should get 404 error', function() {

    goeuro.setUsername('something that doesn\'t exist');
    expect(goeuro.repositories.count()).toEqual(0);
    expect(goeuro.getError()).toEqual("The Github user does not exist.");

  });

});

