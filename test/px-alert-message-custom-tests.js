describe('Alert action buttons update correctly', function() {
  //Button displays
    it('action button reflects the "action" property  open', function(done) {
      var autoDismissAlertEl = fixture('PxDismissAlertMessage');
      flush(function(){
        var btn = autoDismissAlertEl.querySelector('.action button');
        assert.equal(btn.textContent, "Open");
        done();
      });
    });

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

});
