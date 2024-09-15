import assert from 'node:assert';

export class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      assert(this.discountRate > 0, 'Discount rate must be a positive number');
      return aNumber - this.discountRate * aNumber;
    }
  }

  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0, 'Discount rate must be a positive number');
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }
}
