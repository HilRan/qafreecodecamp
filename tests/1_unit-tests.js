const assert = require('chai').assert;

describe('Basic Assertions', function () {
  // #1
  it('#isNull, #isNotNull', function () {
    assert.isNull(null, 'This is null');              
    assert.isNotNull('I am not null', 'This value should not be null');  
  }); 

  // #2
  it('#isDefined, #isUndefined', function () {
    let undef;
    assert.isDefined(null, 'null is defined');
    assert.isUndefined(undef, 'undefined IS undefined');
    assert.isDefined('hello', 'A string is not undefined');
  });

  // #3
  it('#isOk, #isNotOk', function () {
    assert.isNotOk(null, 'null is falsey');
    assert.isOk("I'm truthy", 'A string is truthy');
    assert.isOk(true, 'true is truthy');
  });

  // #4
  it('#isTrue, #isNotTrue', function () {
    assert.isTrue(true, 'true is true');
    assert.isTrue(!!'double negation', 'Double negation of a truthy value is true');
    assert.isNotTrue({}, 'Objects are truthy, but not strictly true'); 
  });

  describe('Equality', function () {
    // #5
    it('#equal, #notEqual', function () {
      assert.equal(12, '12', 'Numbers are coerced into strings with ==');
      assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
      assert.equal(6 * '2', '12');
      assert.notEqual(6 + '2', '12');
    });

    // #6
    it('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6');
      assert.strictEqual(6, 3 * 2);
      assert.strictEqual(6 * '2', 12);
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
    });

    // #7
    it('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, 'The order of array elements does matter');
    });
  });

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  describe('Comparisons', function () {
    // #8
    it('#isAbove, #isAtMost', function () {
      assert.isAtMost('hello'.length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });

    // #9
    it('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5);
      assert.isBelow(2 * Math.random(), 2);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });

    // #10
    it('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.6);
      assert.approximately(weirdNumbers(0.2), 1, 0.9);
    });
  });

  const winterMonths = ['dec', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];

  describe('Arrays', function () {
    // #11
    it('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });

    // #12
    it('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', "It's summer in July...");
      assert.include(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };

  describe('Strings', function () {
    // #13
    it('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'A float is not a string');
      assert.isString(process.env.PATH || '', 'An env variable is a string (or undefined)');
      assert.isString(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });

    // #14
    it('String #include, #notInclude', function () {
      assert.include('Arrow', 'row', "'Arrow' contains 'row'");
      assert.notInclude('dart', 'queue', "But 'dart' doesn't contain 'queue'");
    });

    // #15
    it('#match, #notMatch', function () {
      const regex = /^#\sname:\s[\w\s]+,\sage:\s\d+\n$/;
      assert.match(formatPeople('John Doe', 35), regex);
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  describe('Objects', function () {
    // #16
    it('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', "Cars don't have wings");
      assert.property(airlinePlane, 'engines', 'Planes have engines');
      assert.property(myCar, 'wheels', 'Cars have wheels');
    });

    // #17
    it('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.typeOf(airlinePlane.engines, 'array');
      assert.typeOf(myCar.wheels, 'number');
    });

    // #18
    it('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOf(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object);
      assert.notInstanceOf(myCar.wheels, String);
    });
  });
});
