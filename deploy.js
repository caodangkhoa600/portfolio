const ghpages = require("gh-pages");

ghpages.publish(
  "dist",
  {
    branch: "gh-pages",
    repo: "https://github.com/caodangkhoa600/portfolio",
    message: "Deployed to github page",
  },
  () => {
    console.log("Deploy Complete!");
  }
);