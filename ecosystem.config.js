module.exports = {
    apps : [{
      name      : 'kenotest',
      script    : 'dist/app.js',
      exec_mode: 'cluster',
      instances: "max",
    }]
  }
  