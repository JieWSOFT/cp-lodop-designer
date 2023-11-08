/**
 * @description: 获取屏幕的dpi
 * @return {*}
 */
export function get_dpi() {
  for (var i = 56; i < 2000; i++) {
    if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
      return i;
    }
  }
}

export function px2mm(px: number) {
  return Math.round(px * (25.4 / get_dpi()!))
}