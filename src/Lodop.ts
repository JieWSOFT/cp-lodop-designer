import getLodop from "./utils/LodapFuncs";


function getSpecialKeys(str: string) {
  const reg_g = /\$\{(.+?)\}/g;
  let result = null;
  const list = [];
  do {
    result = reg_g.exec(str);
    result && list.push(result[1]);
  } while (result)
  return list
}

function parseAlignment(align: string) {
  if (align == 'center') {
    return 2
  }
  if (align == 'right') {
    return 3
  }
  return 1
}


/**
 * tabel类型的模板转换成html
 * @param columns 表格列配置信息
 * @param data 表格数据
 */
export const tableTempTohtml = (columns: any[], data: any, style: any) => {

  // 表格全局样式
  let styleStr = 'text-align:' + style.align + ';'
  styleStr += 'font-size:' + style.fontSize + 'pt;'
  // styleStr += 'font-faily:' + style.FontColor + ';'


  let html = '<style> table td,table th {word-break: break-all;box-sizing:border-box;border:1px solid black}</style>'
  html += '<table border=1 width=\'100%\' cellspacing=\'0\' frame="box" cellpadding=\'2\' style=\'border-collapse:collapse;' + styleStr + 'bordercolor= black>'
  // 解析表头
  html += `<thead><tr style='height: ${style.titleHeight ? style.titleHeight + 'mm' : 'auto'}'>`
  columns.forEach((column) => {
    html += `<th style='text-align: ${style.align}; width: ${column.width ? column.width + 'mm' : 'auto'}; height: ${style.titleHeight ? style.titleHeight + 'mm' : 'auto'}'>`
    html += column.title
    html += '</th>'
  })
  html += '</tr></thead>'

  html += '<tbody>'
  // 解析内容
  if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      html += `<tr >`
      columns.forEach(column => {
        html += `<td height='${column.height}mm' style='text-align: ${style.align}'>`
        html += column.key?.trim() == '${index}' ? idx + 1 : item[column.key]
        html += '</td>'
      })
      html += '</tr>'
    })
  }

  html += '</tbody>'
  html += '</table>'
  return html
}

function JSON2LodopDirectives(jsonConfig: any, data: any) {
  const LODOP = getLodop()
  const { items, page } = JSON.parse(jsonConfig)
  // 根据page设置 设置纸张打印属性
  const { direction, width: pageWidth, height: pageHeight } = page
  LODOP.PRINT_INITA(0, 0, `${pageWidth}mm`, `${pageHeight}mm`, `正大打印_${new Date().getTime()}`)
  if (direction == 2) {
    LODOP.SET_PRINT_PAGESIZE(direction, `${pageHeight}mm`, `${pageWidth}mm`, "")//设定纸张大小 
  } else {
    LODOP.SET_PRINT_PAGESIZE(direction, `${pageWidth}mm`, `${pageHeight}mm`, "")//设定纸张大小 
  }
  // 根据items生成打印项
  items?.forEach((item: { name: string; configs: any; }) => {
    const { name, configs }: { name: string, configs: any } = item
    const { left, top, width, height, fontSize, fontFamily, align } = configs
    switch (name) {
      case 'text':
        let { text, itemType, pageIndex } = configs
        const keys = getSpecialKeys(text)
        keys.forEach(key => text = text.replace('${' + key + '}', data[key] ?? ''))
        LODOP.ADD_PRINT_TEXT(`${top}mm`, `${left}mm`, `${width}mm`, `${height}mm`, `${text}`)
        LODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize)
        LODOP.SET_PRINT_STYLEA(0, "FontName", fontFamily)
        LODOP.SET_PRINT_STYLEA(0, "Alignment", parseAlignment(align))
        LODOP.SET_PRINT_STYLEA(0, "ItemType", itemType)
        LODOP.SET_PRINT_STYLEA(0, "PageIndex", pageIndex)
        break
      case 'table':
        let { columns, titleHeight } = configs
        const style = { titleHeight, align, fontSize }
        const dataArr = data['items']
        const tableHtml = tableTempTohtml(columns, dataArr, style)
        LODOP.ADD_PRINT_TABLE(`${top}mm`, `${left}mm`, `${width}mm`, `${height}mm`, tableHtml)
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 3)
        LODOP.SET_PRINT_STYLEA(0, "FontName", fontFamily)
        LODOP.SET_PRINT_STYLEA(0, "Offset2Top", "-27mm")
        break
    }
  })
  LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", `正大打印_${new Date().getTime()}`)
  return LODOP
}

export function JSON2Print(jsonConfig: any, data: any, printer?: any) {
  const LODOP = JSON2LodopDirectives(jsonConfig, data)
  printer && LODOP.SET_PRINTER_INDEX(printer)
  LODOP.PRINT()
}

export function JSON2Preview(jsonConfig: any, data: any, printer?: any) {
  const LODOP = JSON2LodopDirectives(jsonConfig, data)
  printer && LODOP.SET_PRINTER_INDEX(printer)
  LODOP.PREVIEW()
}

export function getPrints() {
  const LODOP = getLodop()
  const printCounts = LODOP.GET_PRINTER_COUNT()
  const arr: { value: number, label: string }[] = []
  for (let i = 0; i < printCounts; i++) {
    arr.push({
      value: i,
      label: LODOP.GET_PRINTER_NAME(i)
    })
  }
  return arr
}