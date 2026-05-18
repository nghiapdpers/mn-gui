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
