import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'three - move method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj = {}) {
  let x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  return x;
}

function Billing() {
  this.rechargeAccount = function(account) {
    if (this.shouldRecharge(account)) {
      // process payment
      account.balance += 10;
    }
  };
  this.shouldRecharge = function(account) {
    return account.balance <= MIN_BALANCE;
  };
}

test('Billing shouldRecharge', function(assert) {
  let account = new Account();
  assert.equal(account.balance, 0);

  const billing = new Billing();
  assert.equal(billing.shouldRecharge(account), true);

  billing.rechargeAccount(account);
  assert.equal(account.balance, 10);
});
