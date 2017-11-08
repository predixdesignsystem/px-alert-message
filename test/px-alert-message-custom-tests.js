describe('Alert action buttons update correctly', function() {

  it('action section does not exist', function() {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    var actionBtn = Polymer.dom(alertMessageEl.root).querySelector('.action');
    expect(actionBtn).to.not.exist;
  });

  it('action button reflects the "dismiss" property', function(done) {
    var alertMessageEl = fixture('PxBasicAlertMessage');
    alertMessageEl.action = "dismiss";
    flush(function(){
      var icon = Polymer.dom(alertMessageEl.root).querySelector('.action .dismiss > px-icon');
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
      expect(Polymer.dom(closeBtnAlert.root).querySelector('#alert').classList.contains('alert-message--visible')).equal(false);
      assert.equal(evt.type, 'px-alert-message-hidden', 'event name should be px-alert-message-hidden');

      closeBtnAlert.removeEventListener('px-alert-message-hidden', handler);
      done();
    });
    closeBtnAlert.action = "dismiss";
    flush(function(){
      Polymer.dom(closeBtnAlert.root).querySelector('.action .dismiss').click();
    });
  });

  it('alert message is hidden after px-alert-message-hidden event is fired when OK button is tapped', function(done) {
    var okBtnAlert = fixture('PxBasicAlertMessage');
    var handler = okBtnAlert.addEventListener('px-alert-message-hidden', function(evt) {
      expect(Polymer.dom(okBtnAlert.root).querySelector('#alert').classList.contains('alert-message--visible')).equal(false);
      assert.equal(evt.type, 'px-alert-message-hidden', 'event name should be px-alert-message-hidden');

      okBtnAlert.removeEventListener('px-alert-message-hidden', handler);
      done();
    });
    okBtnAlert.action = "acknowledge";
    flush(function(){
      Polymer.dom(okBtnAlert.root).querySelector('.action button').click();
    });
  });
});

describe('Truncation shortens message', function(done) {
  it('"show more" btn is hidden when alert title and message fit', function(done) {
    var basicAlert = fixture('PxBasicAlertMessage');
    var moreBtn = Polymer.dom(basicAlert.root).querySelector('#showMoreButton');
    flush(function() {
      expect(moreBtn.hasAttribute('hidden')).equal(true);
      done();
    });
  });

  it('`overset` property is false when alert title and message fit', function(done) {
    var basicAlert = fixture('PxBasicAlertMessage');
    flush(function() {
      expect(basicAlert.overset).equal(false);
      done();
    });
  });

  it('show more" btn is visible when the alert title and message are too long and do not fit', function(done) {
    var longTitleAlert = fixture('PxLongTitleAlert');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    flush(function() {
      expect(moreBtn.hasAttribute('hidden')).equal(false);
      done();
    });
  });

  it('`overset` property is true when the alert title and message are too long and do not fit', function(done) {
    var longTitleAlert = fixture('PxLongTitleAlert');
    flush(function() {
      expect(longTitleAlert.overset).equal(true);
      done();
    });
  });

  it('`overset` property is true when the title is too long and does not fit', function(done) {
    var longTitleAlert = fixture('PxLongTitleAlert');
    flush(function() {
      expect(longTitleAlert.overset).equal(true);
      done();
    });
  });

  it(' if message has a max height of around 32px', function() {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = Polymer.dom(longTitleAlert.root).querySelector('#message');
      assert.closeTo(parseInt(window.getComputedStyle(MessageDiv,null).getPropertyValue("max-height")),32,3,'they are close');
  });

  it(' if longTitleAlert truncates properly', function(done) {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = Polymer.dom(longTitleAlert.root).querySelector('#message');
      flush(function() {
        expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
        done();
      });
  });

  it('truncates longMessageAlert properly', function(done) {
      var longMessageAlert = fixture('PxLongTitleAlert');
      var MessageDiv = Polymer.dom(longMessageAlert.root).querySelector('#message');
      flush(function() {
        expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
        done();
      });
  });
});

describe('Truncated message', function() {
  it('has the collapsed-message class initially, hiding the overset text', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    });
  });

  it('removes the collapsed-message class when it is opened, showing the overset text', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    expect(message.classList.contains('collapsed-message')).to.equal(false);
  });

  it('re-applies the collapsed-message class when it is closed after being opened', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click(); // First open it
    moreBtn.click(); // Then close it
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    })
  });

  it('displays the "Show More" button when it is collapsed', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    expect(moreBtn.textContent).to.equal('Show More');
  });

  it('displays the "Show Less" button when it is opened', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    expect(moreBtn.textContent).to.equal('Show Less');

  });

  it('sets `expanded` property to false when it is collapsed', function() {
    var longAlert = fixture('PxLongTitleAlert');
    expect(longAlert.expanded).to.equal(false);
  });

  it('sets `expanded` property to true when it is opened', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click()
    expect(longAlert.expanded).to.equal(true);
  });

  it('opens the message when the `expanded` property is set via JavaScript', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    longAlert.expanded = true;
    expect(message.classList.contains('collapsed-message')).to.equal(false);
  });

  it('closes the message when the `expanded` property is set via JavaScript', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.expanded = false;
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });

  it('collapses itself when the title changes', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.messageTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    });
  });

  it('collapses itself when the message changes', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    });
  });

  it('collapses itself when the type changes', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = Polymer.dom(longTitleAlert.root).querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.type = 'warning';
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    });
  });
});
