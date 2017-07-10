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

});

describe('Properties and attributes in sync for a declarative defined element', function(){

  //info isn't be manipulated
  it('reflects the "type" property', function() {
    var autoDismissAlert = fixture('PxAutoDismissAlert');
    assert.equal(autoDismissAlert.type, "information");
  });

  it('reflects the "title" property', function() {
    var autoDismissAlert = fixture('PxAutoDismissAlert');
    assert.equal(autoDismissAlert.messageTitle, "Heads up!");
  });

  it('reflects the "message" property', function() {
    var autoDismissAlert = fixture('PxAutoDismissAlert');
    assert.equal(autoDismissAlert.message, "This definitely needs your attention.");
  });

  it('reflects the "action" property', function() {
    var autoDismissAlert = fixture('PxAutoDismissAlert');
    assert.equal(autoDismissAlert.action, "https://www.gesoftware.com/predix");
  });

  it('reflects the "auto-dismiss" property and its a number', function() {
    var autoDismissAlert = fixture('PxAutoDismissAlert');
    assert.equal(autoDismissAlert.autoDismiss, 1500);
  });

});
