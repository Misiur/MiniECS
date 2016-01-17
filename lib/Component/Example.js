function Example () {
    Component.apply(this);
}
Example.prototype = Object.create(Component.prototype);
Example.prototype.constructor = Example;

Example.prototype.onStart = function () {};

Example.prototype.onStop = function () {};

Example.prototype.onUpdate = function (dt) {};

Example.prototype.onRemoved = function () {};