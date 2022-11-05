const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
	let metadata = await Image(src, {
		widths: [300, 600, 900],
		formats: ["webp"],
		urlPath: "/assets/opt/",
		outputDir: "./_site/assets/opt/"
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async"
	};

	return Image.generateHTML(metadata, imageAttributes);
}

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

	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

		dir: {
			input: "src",
		},
	};
};
