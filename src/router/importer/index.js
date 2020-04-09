module.exports = {
  sys: component =>
    require("cyberway-msf-frontend-web-sys/src/views/" + component + ".vue")
      .default,
  dashboard: component =>
    require("cyberway-msf-frontend-web-dashboard/src/views/" +
      component +
      ".vue").default,
  ms: component =>
    require("cyberway-msf-frontend-web-ms/src/views/" + component + ".vue")
      .default,
  log: component =>
    require("cyberway-msf-frontend-web-log/src/views/" + component + ".vue")
      .default
};
