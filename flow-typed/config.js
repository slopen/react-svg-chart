declare module 'config' {
  declare module.exports: Object;
}

declare module 'webpack/hot/log' {
  declare module.exports: {
  	setLogLevel: (level: string) => any
  };
}
