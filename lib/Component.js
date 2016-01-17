function Component () {
    Object.defineProperties(this, {
        '_sharedPrototype': {
            enumerable: false,
            writable: true
        },
        '_started': {
            enumerable: false,
            writable: true            
        }
    });

    this._started = false;
    this._sharedPrototype = this.getSharedPrototype();

    this.owner = null;
};

Component.prototype.getSharedPrototype = function () {
    var prev = null, current = this.__proto__;

    while (current !== Component.prototype) {
        prev = current;
        current = current.__proto__;
    }

    return prev;
};

Component.prototype.onAdded = function () {};
Component.prototype.onStart = function () {};
Component.prototype.onStop = function () {};
Component.prototype.onUpdate = function (dt) {};
Component.prototype.onRemoved = function () {};

module.exports = Component;