const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");
const htmlMinTransform = require("./src/transforms/html-min-transform.js");

async function imageShortcode(src, alt, sizes = "100vw") {
	if (alt === undefined) {
		// You bet we throw an error on missing alt (alt="" works okay)
		throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
	}

	let metadata = await Image(src, {
		widths: [300, 600, 900],
		formats: ["webp", "jpeg"],
		urlPath: "/assets/optimized/",
		outputDir: "./_site/assets/optimized/",
	});

	let lowsrc = metadata.jpeg[0];
	let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

	return `${Object.values(metadata)
		.map((imageFormat) => {
			return `  <source type="${
				imageFormat[0].sourceType
			}" srcset="${imageFormat
				.map((entry) => entry.srcset)
				.join(", ")}" sizes="${sizes}">`;
		})
		.join("\n")}
		<img
		  src="${lowsrc.url}"
		  width="${highsrc.width}"
		  height="${highsrc.height}"
		  alt="${alt}"
		  loading="lazy"
		  decoding="async">`;
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addTransform("htmlmin", htmlMinTransform);
	}

	// Merge data instead of overriding
	eleventyConfig.setDataDeepMerge(true);

	//// CUSTOM COLLECTIONS
	eleventyConfig.addCollection("pages", function (collection) {
		return [...collection.getFilteredByGlob("./src/pages/**/*.md")];
	});

	eleventyConfig.addCollection("featuredPages", function (collectionApi) {
		return collectionApi.getFilteredByTags("featured");
	});

	eleventyConfig.addCollection("posts", (collection) => {
		return [...collection.getFilteredByGlob("./src/posts/**/*.md")];
	});

	eleventyConfig.addCollection("tagList", (collection) => {
		const tagsSet = new Set();
		collection.getAll().forEach((item) => {
			if (!item.data.tags) return;
			item.data.tags
				.filter((tag) => !["all", "nav", "posts", "rss", "page"].includes(tag))
				.forEach((tag) => tagsSet.add(tag));
		});
		return Array.from(tagsSet).sort();
	});

	//// CUSTOM FILTERS
	// human readable date
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"dd LLL yyyy"
		);
	});

	// Post limit
	eleventyConfig.addFilter("limit", function (arr, limit) {
		return arr.slice(0, limit);
	});

	// Copy Static Files to /_Site
	eleventyConfig.addPassthroughCopy("./src/admin");

	// Copy Image Folder to /_site
	eleventyConfig.addPassthroughCopy("./src/assets/");

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/site.css");
	eleventyConfig.addWatchTarget("./tailwind.config.js");

	// Image shortcode
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addLiquidShortcode("image", imageShortcode);
	eleventyConfig.addJavaScriptFunction("image", imageShortcode);

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

		dir: {
			input: "src",
		},
	};
};
