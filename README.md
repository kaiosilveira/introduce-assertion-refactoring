[![Continuous Integration](https://github.com/kaiosilveira/introduce-assertion-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/introduce-assertion-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Introduce Assertion

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
if (this.discountRate) base = base - this.discountRate * base;
```

</td>

<td>

```javascript
assert(this.discountRate > 0);
if (this.discountRate) base = base - this.discountRate * base;
```

</td>
</tr>
</tbody>
</table>

More often than not and since code is read way more times than it is modified / written, programming is a matter of making implicit assumptions explicit, so we delegate less judgment and processing to the reader, allowing for fewer broken assumptions and, therefore, more assertive code. This refactoring brings a quick and easy way to provide this feat.

## Working example

Our working example is a simple program that calculates discount rates for a `Customer`, but only if there's a discount rate associated to the customer themself. The code looks like this:

```javascript
export class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }

  set discountRate(aNumber) {
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }
}
```

### Test suite

The test suite is simple and straightfoward:

```javascript
describe('Customer', () => {
  describe('applyDiscount', () => {
    it('should return the same amount if discountRate is zero', () => {
      const customer = new Customer();
      customer.discountRate = 0;
      expect(customer.applyDiscount(100)).toBe(100);
    });

    it('should return the discounted amount if discountRate is not zero', () => {
      const customer = new Customer();
      customer.discountRate = 0.2;
      expect(customer.applyDiscount(100)).toBe(80);
    });
  });

  describe('set discountRate', () => {
    it('should set the discount rate', () => {
      const customer = new Customer();
      customer.discountRate = 0.2;
      expect(customer.discountRate).toBe(0.2);
    });

    it('should set the discount rate to zero', () => {
      const customer = new Customer();
      customer.discountRate = 0;
      expect(customer.discountRate).toBe(0);
    });

    it('should set the discount rate to null', () => {
      const customer = new Customer();
      customer.discountRate = null;
      expect(customer.discountRate).toBe(null);
    });
  });
});
```

With that in place, we're safe to proceed.

### Steps

We start by strategically switching from a ternary operator to an `if/else` statement at `Customer.applyDiscount`. This will make things easier when introducing the assertion (**[8d9994f](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/8d9994fbb99089c26c9441b4cb91be79be5e542c)**):

```diff
@@ -1,6 +1,7 @@
 export class Customer {
   applyDiscount(aNumber) {
-    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
+    if (!this.discountRate) return aNumber;
+    else return aNumber - this.discountRate * aNumber;
   }
   set discountRate(aNumber) {
```

Then, we introduce the assertion to make sure `discountRate` is always positive (**[cac07a0](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/cac07a0352bfaa17f9a093a7f65a5815ccdfd442)**):

```diff
@@ -1,7 +1,12 @@
+import assert from 'node:assert';
+
 export class Customer {
   applyDiscount(aNumber) {
     if (!this.discountRate) return aNumber;
-    else return aNumber - this.discountRate * aNumber;
+    else {
+      assert(this.discountRate > 0, 'Discount rate must be a positive number');
+      return aNumber - this.discountRate * aNumber;
+    }
   }
   set discountRate(aNumber) {
```

We want to capture things earlier, though, ideally at assignment time, so we move the positive number assertion to the `discountRate` setter itself (**[ec19469](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/ec19469d388799fb16e3d2c1a9dff1f51f774633)**):

```diff
@@ -10,6 +10,7 @@ export class Customer {
   }
   set discountRate(aNumber) {
+    assert(null === aNumber || aNumber >= 0, 'Discount rate must be a positive number');
     this._discountRate = aNumber;
   }
```

Finally, since we're catching the problem ealier now, we can safely remove the assertion at `applyDiscount` (**[a9c7a83](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/a9c7a83c5d584d5da6a4af3d3d02cfc5b04055d3)**):

```diff
@@ -3,10 +3,7 @@ import assert from 'node:assert';
 export class Customer {
   applyDiscount(aNumber) {
     if (!this.discountRate) return aNumber;
-    else {
-      assert(this.discountRate > 0, 'Discount rate must be a positive number');
-      return aNumber - this.discountRate * aNumber;
-    }
+    else return aNumber - this.discountRate * aNumber;
   }
   set discountRate(aNumber) {
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                 | Message                                                            |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [8d9994f](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/8d9994fbb99089c26c9441b4cb91be79be5e542c) | switch from ternary to if/else at `Customer.applyDiscount`         |
| [cac07a0](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/cac07a0352bfaa17f9a093a7f65a5815ccdfd442) | introduce assertion to make sure `discountRate` is always positive |
| [ec19469](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/ec19469d388799fb16e3d2c1a9dff1f51f774633) | move positive number assertion to `discountRate` setter            |
| [a9c7a83](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/a9c7a83c5d584d5da6a4af3d3d02cfc5b04055d3) | remove assertion for positive `discountRate` at `applyDiscount`    |
| [a303df7](https://github.com/kaiosilveira/introduce-assertion-refactoring/commit/a303df78d956fc09248f17c68544827506f77952) | add docs                                                           |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/introduce-assertion-refactoring/commits/main).
