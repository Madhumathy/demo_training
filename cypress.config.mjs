// structure your configuration cleanly and with type support
import { defineConfig } from 'cypress';
// enables .feature files and Gherkin syntax for BDD-style testing
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// compile test files quickly and efficiently
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// connects the Cucumber preprocessor with esbuild, allowing .feature files to be processed correctly
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
// Exports the Cypress configuration using ES module syntax
export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
// Prevents errors by initializing config.env if it's undefined. This is crucial for plugins that 
// rely on environment variables
      config.env = config.env || {};
// Sets up the esbuild bundler and attaches the Cucumber plugin so .feature files can be parsed 
// and compiled.
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
// Hooks into Cypress’s file:preprocessor event to use the esbuild bundler for transforming 
// test files
      on('file:preprocessor', bundler);
// Initializes the Cucumber plugin, enabling Gherkin syntax and step definitions
      await addCucumberPreprocessorPlugin(on, config);
// Returns the modified config object so Cypress can use it
      return config;
    },
    specPattern: 'cypress/e2e/bdd/features/*.feature',
    baseUrl: 'https://automationexercise.com/',
    chromeWebSecurity: false,
    watchForFileChanges : false
  },
});
