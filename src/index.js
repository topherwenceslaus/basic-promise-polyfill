class PolyPromise {
  constructor(executor) {
    this.executor = executor;
    this.resolvedValue = null;
    this.rejectedReason = null;
    this.promiseStatus = "pending";
    const resolve = val => {
      this.resolvedValue = val;
    };

    const reject = val => {
      this.rejectedReason = val;
    };

    executor(resolve, reject);
  }

  then(thenable) {
    thenable(this.resolvedValue);
    this.promiseStatus = "resolved";
    return this;
  }

  catch(catchable) {
    catchable(this.rejectedReason);
    this.promiseStatus = "rejected";
    return this;
  }
}

const p1 = new PolyPromise((res, rej) => {
  rej("error");
});

console.log(p1.promiseStatus);

p1.then(val => console.log(val))
  .then(val => console.log(val))
  .catch(e => console.log(e));
