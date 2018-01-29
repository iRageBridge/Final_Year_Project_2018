// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyChEhv_139I3KimOvlxK-cLRDRb4rp4u5c",
      authDomain: "irishpf-database.firebaseapp.com",
      databaseURL: "https://irishpf-database.firebaseio.com",
      projectId: "irishpf-database",
      storageBucket: "irishpf-database.appspot.com",
      messagingSenderId: "1027694931347"
  }
};
