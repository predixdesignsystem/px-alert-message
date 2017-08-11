describe('Truncation shortens message', function() {
  it('"show more" btn is hidden when alert title and message fit', function() {
    var basicAlert = fixture('PxBasicAlertMessage');
    var moreBtn = basicAlert.querySelector('#showMoreButton');
    expect(moreBtn.hasAttribute('hidden')).equal(true);
  });

  it('`overset` property is false when alert title and message fit', function() {
    var basicAlert = fixture('PxBasicAlertMessage');
    expect(basicAlert.overset).equal(false);
  });

  it('show more" btn is visible when the alert title and message are too long and do not fit', function() {
    var longTitleAlert = fixture('PxLongTitleAlert');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    expect(moreBtn.hasAttribute('hidden')).equal(false);
  });

  it('`overset` property is true when the alert title and message are too long and do not fit', function() {
    var longTitleAlert = fixture('PxLongTitleAlert');
    expect(longTitleAlert.overset).equal(true);
  });

  it('`overset` property is true when the title is too long and does not fit', function() {
    var longTitleAlert = fixture('PxLongTitleAlert');
    expect(longTitleAlert.overset).equal(true);
  });

  it(' if message has a max height of around 32px', function() {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longTitleAlert.querySelector('#message');
      assert.closeTo(parseInt(window.getComputedStyle(MessageDiv,null).getPropertyValue("max-height")),32,3,'they are close');
  });

  it(' if longTitleAlert truncates properly', function() {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longTitleAlert.querySelector('#message');
      expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
  });

  it('truncates longMessageAlert properly', function() {
      var longMessageAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longMessageAlert.querySelector('#message');
      expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
  });
});

describe('Truncated message', function() {
  it('has the collapsed-message class initially, hiding the overset text', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });

  it('removes the collapsed-message class when it is opened, showing the overset text', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    expect(message.classList.contains('collapsed-message')).to.equal(false);
  });

  it('re-applies the collapsed-message class when it is closed after being opened', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click(); // First open it
    moreBtn.click(); // Then close it
    expect(message.classList.contains('collapsed-message')).to.equal(true);
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

  it('collapses itself when the title changes', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.messageTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });

  it('collapses itself when the message changes', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco';
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });

  it('collapses itself when the type changes', function() {
    var longAlert = fixture('PxLongTitleAlert');
    var message = Polymer.dom(longAlert.root).querySelector('#message');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    moreBtn.click();
    longAlert.type = 'warning';
    expect(message.classList.contains('collapsed-message')).to.equal(true);
  });
});
