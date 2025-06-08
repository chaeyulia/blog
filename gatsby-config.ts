import { BLOG_URL } from "./src/constants/url";
import type { GatsbyConfig } from "gatsby";
import { resolve } from "path";

require("dotenv").config({
  path: `.env`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `blog`,
    siteUrl: BLOG_URL,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_ID || ""],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: resolve("src", "images"),
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: resolve("src", "pages"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: resolve("src", "pages", "posts"),
      },
    },
  ],
};

export default config;
