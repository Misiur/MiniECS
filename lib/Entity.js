function Entity () {
    this.id = app.utils.generateUUID();
    this.parent = null;
    this.components = new Map();
    this.children = new Set();
};

Entity.prototype.add = function (component) {
    if (!(component instanceof Component)) {
        throw new Error('You can only add components');
    }

    var proto = component._sharedPrototype;

    if (proto === undefined) {
        throw new Error('Component prototype is empty, did you forget to run Parent#call in constructor?');
    }

    if (this.components.has(proto)) {
        throw new Error('Duplicate component type ("' + component.constructor.name + '" with shared prototype ' + proto.constructor.name + ') added');
    }

    this.components.set(proto, component);
    component.owner = this;
    component.onAdded();

    return this;
};

Entity.prototype.get = function (fn) {
    return this.components.get(fn.prototype);
};

Entity.prototype.has = function (fn) {
    return this.components.has(fn.prototype);
};

Entity.prototype.remove = function (component) {
    var toBeRemoved = null;

    for (var key of this.components.keys()) {
        var current = this.components.get(key);
        if (current === component) {
            toBeRemoved = key;

            break;
        }
    }

    if (toBeRemoved === null) return this;

    if (component._started) {
        component.onStop();
        component._started = false;
    }

    component.onRemoved();

    this.components.delete(toBeRemoved);
    component.owner = null;

    return this;
};

Entity.prototype.removeByKey = function (key) {
    var component = this.components.get(key);

    if (!component) return this;

    if (component._started) {
        component.onStop();
        component._started = false;
    }

    component.onRemoved();

    this.components.delete(key);
    component.owner = null;

    return this;
};

Entity.prototype.removeAll = function () {
    for (var key of this.components.keys()) {
        this.removeByKey(key);
    }

    return this;
};

Entity.prototype.addChild = function (entity) {
    if (!(entity instanceof Entity)) {
        throw new Error('You can only add entities as children');
    }

    this.children.add(entity);
    entity.parent = this;

    return this;
};

Entity.prototype.removeChild = function (entity) {
    if (!(entity instanceof Entity)) {
        throw new Error('You can only remove entities');
    }

    entity.dispose();
    entity.parent = null;
    
    this.children.delete(entity);

    return this;
};

Entity.prototype.removeAllChildren = function () {
    for (var key of this.children.keys()) {
        this.removeChild(key);
    }

    return true;
};

Entity.prototype.dispose = function () {
    this.removeAll();
    this.removeAllChildren();

    return true;
};

module.exports = Entity;