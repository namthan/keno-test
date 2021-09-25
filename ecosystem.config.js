module.exports = {
    apps : [{
      name      : 'chatdemo',
      script    : 'dist/app.js',
      exec_mode: 'cluster',
      instances: "max",
    }]
  }
  