var dest = "../app/public";
var src = 'src';

module.exports = {
  sass: {
    src: src + "/sass",
    srcMaps: "../../public/cssmaps",
    compassPath: "node_modules/compass-mixins/lib",
    dest: "../app/client/css"
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  iconfont:{
    src: "src/icons/*.svg",
    dest: "src/fonts",
    fontName: "app-icons",
    sassMixin: "_icons",
    sass: "src/sass/mixins",
    path: "/fonts/",
    class: "icon",
    template: "gulp/templates/icon-fontawesome.scss"
  },
  fonts:{
    src: "src/fonts/*.{ttf,woff,eof,svg,eot}",
    dest: dest + "/fonts"
  }
};
