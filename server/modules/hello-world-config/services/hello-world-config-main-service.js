var dataService = require("../../../services/data.service");
var emitterService = require("../../../services/emitter.service");
var globalService = require("../../../services/global.service");
var moduleService = require("../../../services/module.service");

module.exports = helloWorldConfigMainService = {
  startup: async function() {
    emitterService.on("beginProcessModuleShortCode", async function(options) {
      if (options.shortcode.name === "HELLO-WORLD") {
        options.moduleName = "hello-world";
        await moduleService.processModuleInColumn(options);
      }
    });

    emitterService.on("postModuleGetData", async function(options) {
      if (options.shortcode.name === "HELLO-WORLD") {

        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let dayOfTheWeek = weekday[d.getDay()];

        options.viewModel.data.greeting = `Happy ${dayOfTheWeek}`;
      }
    });
  }
};
