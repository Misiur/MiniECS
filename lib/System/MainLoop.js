function MainLoop() {
}

MainLoop.prototype.update = function(dt) {
    this.updateEntity(app.root, dt);  
};

MainLoop.prototype.updateEntity = function(entity, dt)
{
    var that = this;

    entity.components.forEach(function (component) {
        if (!component._started) {
            component._started = true;
            component.onStart();
        }

        component.onUpdate(dt);
    });

    entity.children.forEach(function (childEntity) {
        that.updateEntity(childEntity, dt);
    });
}

module.exports = MainLoop;