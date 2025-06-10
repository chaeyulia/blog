import { BLOG_URL } from "./src/constants/url";
import type { GatsbyConfig } from "gatsby";
import remarkGfm from "remark-gfm";
import { resolve } from "path";

require("dotenv").config({
  path: `.env`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "치악산 복숭아 개발 블로그",
    siteUrl: BLOG_URL,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_ID || ""],
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              elements: ["h1", "h2", "h3", "h4"],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              quality: 85,
              withWebp: true,
              withAvif: true,
              loading: "lazy",
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              disableBgImageOnAlpha: true,
              srcSetBreakpoints: [400, 600, 800, 1200],
              showCaptions: true,
              wrapperStyle: "margin: 2rem 0;",
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
          quality: 85,
          breakpoints: [400, 600, 800, 1200, 1600],
        },
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
