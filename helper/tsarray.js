"use strict";

// Hopefully this is threadsafe
class TSArray {
  constructor () {
    this._arr = [];
    this._lock = new Promise((resolve) => resolve());
  }

  get length() {
    return this._arr.length;
  }

  async push (item) {
    await this._lock;
    this._lock = new Promise((resolve, reject) => {
      try {
        this._arr.push(item);
        resolve();
      } catch (err) { 
        reject(err);
      }
    });
  }

  async pushAll (items) {
    await this._lock;
    this._lock = new Promise((resolve, reject) => {
      try {
        items.forEach(item => this._arr.push(item));
        resolve();
      } catch (err) { 
        reject(err);
      }
    });
  }

  async pop () {
    await this._lock;
    this._lock = new Promise((resolve, reject) => {
      try {
        resolve(this._arr.pop());
      } catch (err) { 
        reject(err);
      }
    });
    return this._lock;
  }

  async shift () {
    await this._lock;
    this._lock = new Promise((resolve, reject) => {
      try {
        resolve(this._arr.shift());
      } catch (err) { 
        reject(err);
      }
    });
    return this._lock;
  }

  async unshift (item) {
    await this._lock;
    this._lock = new Promise((resolve, reject) => {
      try {
        this._arr.unshift(item);
        resolve();
      } catch (err) { 
        reject(err);
      }
    });
  }

  *[Symbol.iterator]() {
    var index = -1;
    var data = {...this._arr};
    return {
      next: () => {
        return {
          value: data[++index],
          done: !(index in data)
        }
      }
    };
  }
}

module.exports = {
  TSArray
}