const htmlMinTransform = require("./src/transforms/html-min-transform.js");

module.exports = function (eleventyConfig) {

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addTransform("htmlmin", htmlMinTransform);
	}

	// Merge data instead of overriding
	eleventyConfig.setDataDeepMerge(true);

	// Copy Static Files to /_Site
	eleventyConfig.addPassthroughCopy("./src/admin");

	// Copy Image Folder to /_site
	eleventyConfig.addPassthroughCopy("./src/assets/");

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/site.css");
	eleventyConfig.addWatchTarget("./tailwind.config.js");

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

		dir: {
			input: "src",
		},
	};
};
