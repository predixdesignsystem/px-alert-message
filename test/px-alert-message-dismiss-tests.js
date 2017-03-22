describe('Alert Dismiss', function() {

  it('has the class hidden applied', function(done) {
    var closeBtnAlert = fixture('PxBasicAlertMessage');
    var handler = closeBtnAlert.addEventListener('px-alert-message-hidden', function(evt) {
      expect(closeBtnAlert.querySelector('#alert').classList.contains('hidden')).equal(true);
      assert.equal(evt.type, 'px-alert-message-hidden', 'event name should be px-alert-message-hidden');

      closeBtnAlert.removeEventListener('px-alert-message-hidden', handler);
      done();
    });
    closeBtnAlert.action = "dismiss";
    flush(function(){
      closeBtnAlert.querySelector('.action .dismiss').click();
    });
  });

  it('has the class hidden applied', function(done) {
    var okBtnAlert = fixture('PxBasicAlertMessage');
    var handler = okBtnAlert.addEventListener('px-alert-message-hidden', function(evt) {
      expect(okBtnAlert.querySelector('#alert').classList.contains('hidden')).equal(true);
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
