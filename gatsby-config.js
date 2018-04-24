module.exports = {
  siteMetadata: {
      title: 'HCA Creative Services',
      subtitle: `Fetch Data From Local WP Install`,
  },
  plugins: [
      'gatsby-plugin-react-helmet',
      {
          resolve: "gatsby-source-wordpress",
          options: {
              baseUrl: "hcacs.wpengine.com",
              protocol: "https",
              hostingWPCOM: false,
              useACF: true,
              verboseOutput: true
          }
      }
  ],
};
