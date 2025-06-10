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
      throw result.errors;
    }

    if (!result.data?.allMdx?.edges.length) {
      return;
    }

    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: `/posts${node.frontmatter?.slug}`,
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
    throw error;
  }
};
