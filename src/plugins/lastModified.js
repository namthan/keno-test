// lastMod.js
module.exports = exports = function lastModifiedPlugin(schema, options) {
  schema.add({ createdAt: Date, updatedAt: Date });

  schema.pre('save', function (next) {
    if (this.isNew) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('updatedAt').index(options.index);
  }
}