// TypeScript type definitions for MNGUI v3.0.0
// Project: https://github.com/nghiapdpers/mn-gui
// Definitions by: Antigravity AI Pair Programmer

export class BaseComponent {
  child: HTMLElement;
  style(cssString: string): this;
  persist(storageKey: string): this;
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
  constructor(text: string);
  setText(text: string): this;
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
  constructor(text: string, items: Array<{ id: string | number; text: string }>, defaultId?: string | number);
  onChange(callback: (id: string | number, item: { id: string | number; text: string }) => void): this;
  getValue(): string | number;
  setValue(id: string | number): this;
}

export class MNBadge extends BaseComponent {
  constructor(text: string, type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info');
}

export class MNDivider extends BaseComponent {
  constructor();
}

export class MNAccordion extends BaseComponent {
  constructor(title: string, isExpanded?: boolean);
  append(component: BaseComponent | HTMLElement): this;
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
