export default class Globals {
      public static onInit() {
            window.sessionStorage.setItem("spfx-debug", "");
      }

      public static isIE11(): boolean {
            const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
            const msie = ua.indexOf("MSIE "); // IE 10 or older
            const trident = ua.indexOf("Trident/"); //IE 11

            return msie > 0 || trident > 0;
      }
}
