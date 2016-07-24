exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],

  specs: ['specs.js'],

  jasmineNodeOpts: {
    showColors: true
  }
};