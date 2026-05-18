// TypeScript type definitions for MNGUI v3.0.0
// Project: https://github.com/nghiapdpers/mn-gui
// Definitions by: Antigravity AI Pair Programmer

export class MNState<T = any> {
  constructor(initialValue: T);
  get value(): T;
  set value(newValue: T);
  subscribe(callback: (value: T) => void): () => void;
}

export class BaseComponent {
  element: HTMLElement;
  style(cssString: string): this;
  persist(storageKey: string): this;
  addEventListenerSafe(
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): this;
  removeEventListenerSafe(
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): this;
  on(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): this;
  bind(state: MNState): this;
  destroy(): void;
}

export class MNColumn extends BaseComponent {
  constructor();
  append(component: BaseComponent | HTMLElement): this;
}

export class MNRow extends BaseComponent {
  constructor();
  append(component: BaseComponent | HTMLElement): this;
}

export class MNText extends BaseComponent {
  constructor(text?: string);
  setValue(text: string): this;
  getValue(): string;
}

export class MNButton extends BaseComponent {
  constructor(text: string);
  onClick(callback: (event: MouseEvent) => void): this;
}

export class MNSwitch extends BaseComponent {
  constructor(text: string, defaultValue?: boolean);
  onChange(callback: (value: boolean) => void): this;
  getValue(): boolean;
  setValue(value: boolean): this;
}

export class MNCheckbox extends BaseComponent {
  constructor(text: string, defaultValue?: boolean);
  onChange(callback: (value: boolean) => void): this;
  getValue(): boolean;
  setValue(value: boolean): this;
}

export class MNSlider extends BaseComponent {
  constructor(text: string, min: number, max: number, defaultValue?: number, step?: number);
  onChange(callback: (value: number) => void): this;
  getValue(): number;
  setValue(value: number): this;
}

export class MNSelect extends BaseComponent {
  constructor(placeholder?: string);
  setData(data: Array<any>): this;
  onChange(callback: (id: string | number, text: string) => void): this;
  getValue(): string | number;
  setValue(id: string | number): this;
}

export class MNBadge extends BaseComponent {
  constructor(text?: string, type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info');
  setValue(text: string): this;
  getValue(): string;
}

export class MNDivider extends BaseComponent {
  constructor();
}

export class MNAccordion extends BaseComponent {
  constructor(title: string, isExpanded?: boolean);
  append(nodes: BaseComponent | Array<BaseComponent>): this;
}

export class MNColorPicker extends BaseComponent {
  constructor(title: string, defaultColor?: string);
  onChange(callback: (color: string) => void): this;
  getValue(): string;
  setValue(color: string): this;
}

export class StackNavigator {
  constructor(screens: Array<{ name: string; component: BaseComponent }>, initialScreen: string);
  push(screenName: string): void;
  pop(): void;
}

export class Theme {
  mode: string;
  constructor(
    primary?: string,
    primaryVariant?: string,
    secondary?: string,
    secondaryVariant?: string,
    background?: string,
    surface?: string,
    error?: string,
    onPrimary?: string,
    onSecondary?: string,
    onBackground?: string,
    onSurface?: string,
    onError?: string
  );
  setMode(mode: 'light' | 'dark' | 'auto'): void;
  toggleMode(): void;
}

export class Popup {
  child: HTMLElement;
  toggleProps: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
    width?: string;
    height?: string;
    fontSize?: string;
  };
  setTitle(title: string): void;
}

export class MNGUI {
  constructor(theme?: Theme, toggleProps?: Popup['toggleProps']);
  popup: Popup;
  navigator: StackNavigator;
  setNavigator(navigator: StackNavigator): this;
  render(): void;
  back(): void;
}

export class MNToast {
  static show(
    text: string,
    type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info',
    duration?: number
  ): void;
}

export class MNImage extends BaseComponent {
  constructor(src?: string, alt?: string, objectFit?: string);
  setSrc(src: string): this;
  setObjectFit(fit: string): this;
  setHeight(h: number | string): this;
  setWidth(w: number | string): this;
  onClick(callback: (event: MouseEvent) => void): this;
}

export class MNTabs extends BaseComponent {
  constructor(tabs?: Array<{ id: string; title: string; component: BaseComponent | Array<BaseComponent> }>);
  addTab(id: string, title: string, component: BaseComponent | Array<BaseComponent>): this;
  setActiveTab(id: string): this;
}

export class MNTextArea extends BaseComponent {
  constructor(placeholder?: string, rows?: number);
  getValue(): string;
  setValue(val: string): this;
  setValueSilently(val: string): this;
  onChange(callback: (value: string) => void): this;
}

export class MNProgressBar extends BaseComponent {
  constructor(initialValue?: number, showLabel?: boolean);
  setValue(percent: number): this;
}

export class MNSpinner extends BaseComponent {
  constructor(size?: string, color?: string);
}

export class MNTooltip extends BaseComponent {
  constructor(targetComponent: BaseComponent | HTMLElement, text: string, position?: 'top' | 'bottom' | 'left' | 'right');
}

export class MNRadioGroup extends BaseComponent {
  constructor(options?: Array<{ label: string; value: string | number }>, selectedValue?: string | number);
  getValue(): string | number | null;
  setValue(val: string | number): this;
  setValueSilently(val: string | number): this;
  onChange(callback: (value: string | number | null) => void): this;
}

export class MNTable extends BaseComponent {
  constructor(columns?: Array<{ key: string; label: string; width?: string }>, data?: Array<Record<string, any>>);
  renderHeader(): void;
  setData(data: Array<Record<string, any>>): this;
}

export class MNDialog {
  static show(options?: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }): void;
}
