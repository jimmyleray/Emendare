module.exports = {
  title: 'Emendare UI',
  require: ['bulma/css/bulma.min.css'],
  template: {
    head: {
      scripts: [
        {
          src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js'
        }
      ]
    }
  },
  components: 'src/components/**/*.tsx',
  styles: {
    Markdown: {
      code: {
        padding: '0.2em 0.5em',
        border: '1px solid rgba(0,0,0,0.05)',
        margin: 0,
        fontSize: '85%',
        backgroundColor: 'rgba(27,31,35,0.05)',
        borderRadius: '3px'
      }
    },
    StyleGuide: {
      content: {
        maxWidth: '100%'
      }
    }
  },
  sections: [
    { name: 'Atoms', components: 'src/components/0_atoms/**/*.tsx' },
    { name: 'Molecules', components: 'src/components/1_molecules/**/*.tsx' },
    { name: 'Templates', components: 'src/components/3_templates/**/*.tsx' },
    { name: 'Pages', components: 'src/components/4_pages/**/*.tsx' },
    { name: 'Context', components: 'src/components/5_contexts/**/*.tsx' },
    { name: 'Layouts', components: 'src/components/6_layouts/**/*.tsx' }
  ],
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, '.md')
  },
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.output = {
      ...webpackConfig.output,
      publicPath: process.env.PUBLIC_URL
    }
    return webpackConfig
  },
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts/config/webpack.config'),
  ignore: ['**/*.spec.ts', '**/*.spec.tsx'],
  skipComponentsWithoutExample: true
}
