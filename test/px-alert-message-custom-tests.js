describe('Alert action buttons update correctly', function() {
  //Button displays
  it('action section does not exist', function() {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    var actionBtn = alertMessageEl.querySelector('.action');
    expect(actionBtn).to.not.exist;
  });

  it('action button reflects the "dismiss" property', function(done) {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    alertMessageEl.action = "dismiss";
    flush(function(){
      var icon = alertMessageEl.querySelector('.action .dismiss > iron-icon');
      expect(icon).to.exist;
      done();
    });
  });

  it('action button reflects the "action" property  ok', function() {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    alertMessageEl.action = "acknowledge";
    flush(function(){
      var btn = alertMessageEl.querySelector('.action button');
      assert.equal(btn.textContent, "OK");
      assert.equal(alertMessageEl.resources.en.OK, "OK");
    });
  });

  it('action button reflects the "action" property  open', function(done) {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    alertMessageEl.action = "https://www.predix.io/";
    flush(function(){
      var btn = alertMessageEl.querySelector('.action button');
      assert.equal(btn.textContent, "Open");
      done();
    });
  });

});

// localisation tests
describe('Multiple language zh-cn', function() {

  it('if language="zh-cn" ', function() {
    var multipleLanguageAlert = fixture('PxMultipleLanguageAlert');
    flush(function(){
      var moreBtnMessage = multipleLanguageAlert.querySelector('#showMoreButton');
      assert.equal(moreBtnMessage.textContent, "显示更多");
    });
  });

});
