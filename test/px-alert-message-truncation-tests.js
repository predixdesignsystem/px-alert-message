describe('Truncation shortens message', function() {
  it('"show more" btn is hidden on basic alert', function() {
    var basicAlert = fixture('PxBasicAlertMessage');
    var moreBtn = basicAlert.querySelector('#showMoreButton');
    expect(moreBtn.classList.contains('visuallyhidden')).equal(true);
  });

  it('show more" btn is not hidden on longTitleAlert alert', function() {
    var longTitleAlert = fixture('PxLongTitleAlert');
    var moreBtn = longTitleAlert.querySelector('#showMoreButton');
    expect(moreBtn.classList.contains('visuallyhidden')).equal(false);
  });

  it('show more" btn is not hidden on longMessageAlert alert', function() {
      var longMessageAlert = fixture('PxLongTitleAlert');
      var moreBtn = longMessageAlert.querySelector('#showMoreButton');
      expect(moreBtn.classList.contains('visuallyhidden')).equal(false);
  });

  it(' if message has a max height of around 60px', function() {
      var longTitleAlert = fixture('PxLongTitleAlert');
      var MessageDiv = longTitleAlert.querySelector('#message');
      assert.closeTo(parseInt(window.getComputedStyle(MessageDiv,null).getPropertyValue("max-height")),60,3,'they are close');
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


describe('Message expands after click', function() {
  var longTitleAlert = document.querySelector('#longTitleAlertStateful');
  var longMessageAlert = document.querySelector('#longMessageAlertStateful');
  before(function(done){
    var moreBtnTitle = longTitleAlert.querySelector('#showMoreButton');
    moreBtnTitle.click();
    var moreBtnMessage = longMessageAlert.querySelector('#showMoreButton');
    moreBtnMessage.click();
    //wait for message to expand
    setTimeout(function(){
      done();
    },1000);
  });
  it('if the collapsedMessage class is removed from longTitleAlert', function() {
    expect(longTitleAlert.querySelector('#message').classList.contains('collapsedMessage')).equal(false);
  });
  it('if the collapsedMessage class is removed from longMessageAlert', function() {
    expect(longMessageAlert.querySelector('#message').classList.contains('collapsedMessage')).equal(false);
  });
  it('if the "show more" says "show less"', function() {
    var moreBtnTitle = longTitleAlert.querySelector('#showMoreButton');
    assert.equal(moreBtnTitle.textContent, "Show Less");
  });
  it('if the "show more" says "show less"', function() {
    var moreBtnMessage = longMessageAlert.querySelector('#showMoreButton');
    assert.equal(moreBtnMessage.textContent, "Show Less");
  });
  it(' if longTitleAlert expands properly', function() {
    var MessageDiv = longTitleAlert.querySelector('#message');
    assert.equal(MessageDiv.scrollHeight, MessageDiv.clientHeight);
  });
  it('expands longMessageAlert properly', function() {
    var MessageDiv = longMessageAlert.querySelector('#message');
    assert.equal(MessageDiv.scrollHeight, MessageDiv.clientHeight);
  });
});

describe('Message collapses after click', function() {
  var longTitleAlert = document.querySelector('#longTitleAlertStateful');
  var longMessageAlert = document.querySelector('#longMessageAlertStateful');

  before(function(done){
    var moreBtnTitle = longTitleAlert.querySelector('#showMoreButton');
    moreBtnTitle.click();
    var moreBtnMessage = longMessageAlert.querySelector('#showMoreButton');
    moreBtnMessage.click();
    //wait for message to expand
    setTimeout(function(){
      done();
    },500);
  });
  it('reapplies the collapsedMessage class from longTitleAlert', function() {
      expect(longTitleAlert.querySelector('#message').classList.contains('collapsedMessage')).equal(true);
  });
  it('reapplies the collapsedMessage class from longMessageAlert', function() {
      expect(longMessageAlert.querySelector('#message').classList.contains('collapsedMessage')).equal(true);
  });

  it('say "show more" instead of "show less"', function() {
      var moreBtnTitle = longTitleAlert.querySelector('#showMoreButton');
      assert.equal(moreBtnTitle.textContent, "Show More");
  });
  it('say "show more" instead of "show less"', function() {
      var moreBtnMessage = longMessageAlert.querySelector('#showMoreButton');
      assert.equal(moreBtnMessage.textContent, "Show More");
  });
  it(' if longTitleAlert truncates properly', function() {
      var MessageDiv = longTitleAlert.querySelector('#message');
      expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
  });
  it('truncates longMessageAlert properly', function() {
      var MessageDiv = longMessageAlert.querySelector('#message');
      expect(MessageDiv.scrollHeight >= MessageDiv.clientHeight).equal(true);
  });

});
