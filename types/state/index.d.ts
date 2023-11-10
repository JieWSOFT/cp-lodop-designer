export declare const usePageGlobalState: () => {
    width: string;
    height: string;
    direction: number;
};
export declare const useWidgetsGlobalState: () => {
    widgets: {
        [key: string]: any;
    };
    widgetStore: {
        vNode: any;
        temp: any;
        nanoid: string;
        editorTemp: any;
    }[];
    currentWidgetId: import("vue").Ref<string>;
    currentWidget: import("vue").Ref<{
        vNode: any;
        temp: any;
        nanoid: string;
        editorTemp: any;
    } | undefined>;
    editors: {
        [key: string]: any;
    };
};
