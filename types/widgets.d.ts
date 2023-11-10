// Lock screen information
export interface BaseWidgetConfigs {
  fontSize: number,
  left: number,
  top: number,
  width: number,
  height: number,
  fontWeight: number,
  fontFamily: string,
  align: 'center' | 'left' | 'right',
}

export interface TextWidgetConfigs extends BaseWidgetConfigs {
  text: string,
  itemType?: number,
  pageIndex?: string | number | null
}

export interface TableWidgetConfigs extends BaseWidgetConfigs {
  columns: { title: string, key: string, width?: number, height?: number }[]
  titleHeight?: number,
  Offset2Top?: number
}