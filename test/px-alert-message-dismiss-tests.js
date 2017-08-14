describe('Alert Dismiss', function() {

  it('`visible` is initially set to true when the alert message attaches', function() {
    var dismissAlert = fixture('PxDismissAlertMessage');
    flush(function() {
      expect(dismissAlert.visible).to.equal(true);
    });
  });

  it('`visible` is initially set to false when the alert message attaches if `disableAutoShow` is set', function() {
    var dismissAlert = fixture('PxDisableAutoShowAlertMessage');
    flush(function() {
      expect(dismissAlert.visible).to.equal(false);
    });
  });

  it('`visible` is set to false when the alert message is dismissed', function(done) {
    var dismissAlert = fixture('PxDismissAlertMessage');
    flush(function() {
      var closeBtn = Polymer.dom(dismissAlert.root).querySelector('#dismissButton');
      closeBtn.click();
      expect(dismissAlert.visible).to.equal(false);
      done();
    });
  });

  it('message is shown and hidden when `visible` is set via JavaScript', function(done) {
    var dismissAlert = fixture('PxDismissAlertMessage');
    flush(function() {
      dismissAlert.visible = false;
      var alert = Polymer.dom(dismissAlert.root).querySelector('#alert');
      // Wait 500ms for each animation to finish
      setTimeout(function() {
        expect(window.getComputedStyle(alert).display).to.equal('none');
        dismissAlert.visible = true;
      }, 500);
      setTimeout(function() {
        expect(window.getComputedStyle(alert).display).to.equal('flex');
        done();
      }, 1000);
    });
  });

  it('alert message is automatically dismissed after the `autoDismiss` timeout', function(done) {
    var dismissAlert = fixture('PxAutoDismissAlertShort');
    flush(function() {
      var alert = Polymer.dom(dismissAlert.root).querySelector('#alert');
      expect(window.getComputedStyle(alert).display).to.equal('flex');
      setTimeout(function() {
        expect(window.getComputedStyle(alert).display).to.equal('none');
        done();
      }, 1200); // wait long enough for autoDismiss timeout AND animation to finish
    });
  });

  it('alert message is automatically dismissed after the `autoDismiss` timeout when it is re-opened', function(done) {
    var dismissAlert = fixture('PxAutoDismissAlertShort');
    flush(function() {
      var alert = Polymer.dom(dismissAlert.root).querySelector('#alert');
      dismissAlert.visible = false;
      setTimeout(function() {
        dismissAlert.visible = true;
      }, 100);
      setTimeout(function() {
        expect(window.getComputedStyle(alert).display).to.equal('none');
        done();
      }, 1000); // wait long enough for autoDismiss timeout AND animation to finish
    });
  });

  it('alert message is hidden after px-alert-message-hidden event is fired when dismiss X is tapped', function(done) {
    var closeBtnAlert = fixture('PxBasicAlertMessage');
    var handler = closeBtnAlert.addEventListener('px-alert-message-hidden', function(evt) {
      expect(closeBtnAlert.querySelector('#alert').classList.contains('alert-message--visible')).equal(false);
      assert.equal(evt.type, 'px-alert-message-hidden', 'event name should be px-alert-message-hidden');

      closeBtnAlert.removeEventListener('px-alert-message-hidden', handler);
      done();
    });
    closeBtnAlert.action = "dismiss";
    flush(function(){
      closeBtnAlert.querySelector('.action .dismiss').click();
    });
  });

  it('alert message is hidden after px-alert-message-hidden event is fired when OK button is tapped', function(done) {
    var okBtnAlert = fixture('PxBasicAlertMessage');
    var handler = okBtnAlert.addEventListener('px-alert-message-hidden', function(evt) {
      expect(okBtnAlert.querySelector('#alert').classList.contains('alert-message--visible')).equal(false);
      assert.equal(evt.type, 'px-alert-message-hidden', 'event name should be px-alert-message-hidden');

      okBtnAlert.removeEventListener('px-alert-message-hidden', handler);
      done();
    });
    okBtnAlert.action = "acknowledge";
    flush(function(){
      okBtnAlert.querySelector('.action button').click();
    });
  });
});
