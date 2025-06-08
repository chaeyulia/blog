const path = require("path");

exports.onPreInit = () => {
  console.log("Gatsby is starting to build...");
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  try {
    console.log("Starting to create pages...");

    const result = await graphql(`
      query {
        allMdx {
          edges {
            node {
              id
              frontmatter {
                slug
              }
              internal {
                contentFilePath
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
      console.error("GraphQL query errors:", result.errors);
      throw result.errors;
    }

    console.log("Query result:", JSON.stringify(result.data, null, 2));

    if (!result.data?.allMdx?.edges.length) {
      console.log("No MDX files found!");
      return;
    }

    result.data.allMdx.edges.forEach(({ node }) => {
      const pagePath = `/posts${node.frontmatter?.slug}`;
      console.log("Creating page:", {
        path: pagePath,
        id: node.id,
        slug: node.frontmatter.slug,
      });

      createPage({
        path: pagePath,
        component: `${require.resolve(
          "./src/templates/post.tsx"
        )}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
        },
      });
    });

    console.log("Finished creating pages!");
  } catch (error) {
    console.error("Error in createPages:", error);
    throw error;
  }
};

exports.onPostBuild = () => {
  console.log("Gatsby build is finished!");
};
