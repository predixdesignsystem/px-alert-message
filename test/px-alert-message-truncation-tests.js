describe('Truncation shortens message', function(done) {
  it('"show more" btn is hidden when alert title and message fit', function(done) {
    var basicAlert = fixture('PxBasicAlertMessage');
    var moreBtn = basicAlert.querySelector('#showMoreButton');
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
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
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
      var MessageDiv = longTitleAlert.querySelector('#message');
      assert.closeTo(parseInt(window.getComputedStyle(MessageDiv,null).getPropertyValue("max-height")),32,3,'they are close');
  });

  it(' if longTitleAlert truncates properly', function(done) {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longTitleAlert.querySelector('#message');
      flush(function() {
        expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
        done();
      });
  });

  it('truncates longMessageAlert properly', function(done) {
      var longMessageAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longMessageAlert.querySelector('#message');
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
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    expect(message.classList.contains('collapsed-message')).to.equal(false);
  });

  it('re-applies the collapsed-message class when it is closed after being opened', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click(); // First open it
    moreBtn.click(); // Then close it
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    })
  });

  it('displays the "Show More" button when it is collapsed', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    expect(moreBtn.textContent).to.equal('Show More');
  });

  it('displays the "Show Less" button when it is opened', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    expect(moreBtn.textContent).to.equal('Show Less');

  });

  it('sets `expanded` property to false when it is collapsed', function() {
    var longAlert = fixture('PxLongTitleAlert');
    expect(longAlert.expanded).to.equal(false);
  });

  it('sets `expanded` property to true when it is opened', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
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
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.expanded = false;
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });

  it('collapses itself when the title changes', function(done) {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
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
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
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
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.type = 'warning';
    flush(function() {
      expect(message.classList.contains('collapsed-message')).to.equal(true);
      done();
    });
  });
});
