import { getShadowRoot } from './BaseComponent.js';
import { StatePersistence } from './StatePersistence.js';

export class Theme {
  constructor (
    primary = "#10b981",
    primaryVariant = "#059669",
    secondary = "#f59e0b",
    secondaryVariant = "#d97706",
    background = "#f4fcf7",
    surface = "rgba(255, 255, 255, 0.8)",
    error = "#ef4444",
    onPrimary = "#ffffff",
    onSecondary = "#ffffff",
    onBackground = "#0f172a",
    onSurface = "#0f172a",
    onError = "#ffffff"
  ) {
    this.primary = primary;
    this.primaryVariant = primaryVariant;
    this.secondary = secondary;
    this.secondaryVariant = secondaryVariant;
    this.background = background;
    this.surface = surface;
    this.error = error;
    this.onPrimary = onPrimary;
    this.onSecondary = onSecondary;
    this.onBackground = onBackground;
    this.onSurface = onSurface;
    this.onError = onError;

    this.mode = StatePersistence.get("mngui_theme_mode") || "auto";
    this.applyVariables();

    const css = `
      * {
        box-sizing: border-box;
      }

      div.mn-column {
        display: flex;
        flex-direction: column;
        background: transparent;
        gap: 12px;
        width: 100%;
      }

      div.mn-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: transparent;
        gap: 12px;
        width: 100%;
      }

      .mn-padding {
        padding: 12px;
      }

      .mn-normal-text {
        font-size: 14px;
        color: var(--mn_onSurface);
        font-family: var(--mn_font);
        line-height: 1.5;
      }

      /* Switch */
      .mn-toggle {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        font-size: 14px;
        user-select: none;
      }
      .mn-toggle-switch {
        display: inline-block;
        background: var(--mn_background);
        border-radius: 16px;
        width: 50px;
        height: 26px;
        position: relative;
        transition: background 0.25s ease, border-color 0.25s ease;
        border: 1px solid var(--mn_border);
      }
      .mn-toggle-switch:before {
        content: "";
        display: block;
        background: var(--mn_surface_solid);
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        width: 20px;
        height: 20px;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .mn-toggle-checkbox:checked + .mn-toggle-switch {
        background: var(--mn_primary);
        border-color: var(--mn_primaryVariant);
      }
      .mn-toggle-checkbox:checked + .mn-toggle-switch:before {
        transform: translateX(24px);
      }
      .mn-toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }
      .mn-toggle-label {
        font-weight: 500;
      }

      /* Checkbox */
      .mn-checkbox-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        font-size: 14px;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        user-select: none;
        font-weight: 500;
      }
      .mn-checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .mn-checkmark {
        position: absolute;
        top: 5px;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: var(--mn_background);
        border: 1px solid var(--mn_border);
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      .mn-checkbox-container:hover input ~ .mn-checkmark {
        border-color: var(--mn_primary);
      }
      .mn-checkbox-container input:checked ~ .mn-checkmark {
        background-color: var(--mn_primary);
        border-color: var(--mn_primary);
      }
      .mn-checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
      .mn-checkbox-container input:checked ~ .mn-checkmark:after {
        display: block;
      }
      .mn-checkbox-container .mn-checkmark:after {
        left: 6px;
        top: 2px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      /* Input */
      .mn-input {
        border: 1.5px solid var(--mn_border);
        height: 2.6em;
        padding: 0 12px;
        outline: none;
        font-family: var(--mn_font);
        font-size: 14px;
        color: var(--mn_onSurface);
        background-color: var(--mn_background);
        border-radius: 8px;
        transition: border-color 0.25s, box-shadow 0.25s;
        width: 100%;
      }
      .mn-input:focus {
        border-color: var(--mn_primary);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        background-color: var(--mn_surface_solid);
      }
      .mn-input::placeholder {
        color: var(--mn_onSurface);
        opacity: 0.5;
      }

      /* Slider */
      .mn-slider-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        font-family: var(--mn_font);
      }
      .mn-slider-header {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 600;
        color: var(--mn_onSurface);
      }
      .mn-slider {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: var(--mn_border);
        outline: none;
        transition: background 0.15s ease;
      }
      .mn-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--mn_primary);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        transition: transform 0.15s ease;
      }
      .mn-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
      }

      /* Select */
      .mn-select {
        display: block;
        margin: 6px 0;
        width: 100%;
        font-family: var(--mn_font);
        position: relative;
      }
      .mn-select-label {
        cursor: pointer;
        display: block;
        width: 100%;
      }
      .mn-select [type=button] {
        background: var(--mn_background);
        border: 1px solid var(--mn_border);
        border-radius: 8px;
        color: var(--mn_onSurface);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 38px;
        padding: 0 16px;
        outline: none;
        font-family: var(--mn_font);
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        text-align: left;
      }
      .mn-select [type=button]:focus, .mn-select [type=button]:hover {
        border-color: var(--mn_primary);
        background: var(--mn_surface_solid);
      }
      .mn-select [type=button]:after {
        content: '▾';
        font-size: 12px;
        opacity: 0.7;
        transition: transform 0.2s ease;
      }
      .mn-select.mn-active [type=button]:after {
        transform: rotate(180deg);
      }
      .mn-select ul[role=listbox] {
        background-color: var(--mn_surface_solid);
        border: 1px solid var(--mn_border);
        border-radius: 8px;
        color: var(--mn_onSurface);
        list-style: none;
        margin: 4px 0 0 0;
        max-height: 0;
        position: absolute;
        left: 0;
        right: 0;
        padding: 0;
        opacity: 0;
        pointer-events: none;
        transition: all 0.2s ease;
        box-shadow: var(--mn_shadow);
        overflow-y: auto;
        scrollbar-width: thin;
        z-index: 10;
      }
      .mn-select ul[role=listbox] li {
        height: 38px;
        margin: 0;
        padding: 10px 16px;
        outline: none;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        transition: background-color 0.15s;
      }
      .mn-select ul[role=listbox] li:hover, .mn-select ul[role=listbox] li.mn-active {
        background: var(--mn_primary);
        color: var(--mn_onPrimary);
      }
      .mn-select.mn-active ul[role=listbox] {
        max-height: 180px;
        opacity: 1;
        pointer-events: auto;
      }

      /* Button */
      .mn-button {
        padding: 10px 20px;
        border: 1.5px solid var(--mn_primary);
        background-color: transparent;
        color: var(--mn_primary);
        font-family: var(--mn_font);
        font-size: 14px;
        cursor: pointer;
        border-radius: 30px;
        transition: all 0.25s ease;
        outline: none;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .mn-button:hover {
        background: var(--mn_primary);
        color: var(--mn_onPrimary);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }
      .mn-button:active {
        transform: scale(0.98);
      }

      /* Divider & Badge */
      .mn-divider {
        border: 0;
        height: 1px;
        background: var(--mn_border);
        margin: 8px 0;
        width: 100%;
      }
      .mn-badge {
        display: inline-block;
        padding: 3px 8px;
        font-size: 11px;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 10px;
        font-family: var(--mn_font);
      }
      .mn-badge-primary { background-color: var(--mn_primary); }
      .mn-badge-secondary { background-color: var(--mn_secondary); }
      .mn-badge-success { background-color: #10b981; }
      .mn-badge-warning { background-color: #f59e0b; }

      /* Screens */
      .mn-screen {
        position: absolute;
        padding: 16px;
        inset: 0;
        top: 48px; /* account for header space */
        width: 100%;
        height: calc(100% - 48px);
        background: transparent;
        opacity: 0;
        transform: translateX(0);
        pointer-events: none;
        transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .mn-screen.show {
        opacity: 1;
        pointer-events: auto;
        z-index: 2;
        transform: translateX(0) !important;
      }
      .mn-screen.enter-from-right {
        transform: translateX(100%);
        opacity: 0;
      }
      .mn-screen.enter-from-left {
        transform: translateX(-100%);
        opacity: 0;
      }
      .mn-screen.exit-to-right {
        transform: translateX(100%);
        opacity: 0;
      }
      .mn-screen.exit-to-left {
        transform: translateX(-100%);
        opacity: 0;
      }

      /* Draggable Header bar styling */
      #mngui-header {
        height: 48px;
        width: 100%;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--mn_border);
        background: rgba(255, 255, 255, 0.05);
        cursor: move;
        user-select: none;
        font-family: var(--mn_font);
      }
      .mngui-title {
        font-weight: 700;
        color: var(--mn_onSurface);
        font-size: 15px;
      }
      .mngui-close-btn {
        border: none;
        background: transparent;
        color: var(--mn_onSurface);
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        transition: background-color 0.2s;
        opacity: 0.7;
      }
      .mngui-close-btn:hover {
        background-color: var(--mn_border);
        opacity: 1;
      }

      /* Toast notifications container */
      #mn-toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
        font-family: var(--mn_font);
      }
      .mn-toast {
        min-width: 200px;
        max-width: 320px;
        padding: 12px 18px;
        border-radius: 8px;
        background: var(--mn_surface_solid);
        color: var(--mn_onSurface);
        font-size: 13px;
        font-weight: 500;
        box-shadow: var(--mn_shadow);
        border: 1px solid var(--mn_border);
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
      }
      .mn-toast.show {
        transform: translateY(0);
        opacity: 1;
      }
      .mn-toast-success {
        border-left: 4px solid #10b981;
      }
      .mn-toast-error {
        border-left: 4px solid #ef4444;
      }
      .mn-toast-info {
        border-left: 4px solid var(--mn_primary);
      }

      /* Accordion Collapsible Group */
      .mn-accordion {
        width: 100%;
        border-radius: var(--mn_radius);
        border: 1px solid var(--mn_border);
        background: var(--mn_surface);
        overflow: hidden;
        margin-bottom: 4px;
        transition: all 0.25s ease;
      }
      .mn-accordion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        font-size: 14px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.02);
        transition: background 0.2s ease;
      }
      .mn-accordion-header:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      .mn-accordion-chevron {
        width: 16px;
        height: 16px;
        fill: currentColor;
        transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .mn-accordion.mn-expanded .mn-accordion-chevron {
        transform: rotate(90deg);
      }
      .mn-accordion-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        border-top: 1px solid var(--mn_border);
        max-height: 2000px;
        opacity: 1;
        transition: max-height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), padding 0.3s ease, opacity 0.2s ease;
        overflow: hidden;
      }
      .mn-accordion:not(.mn-expanded) .mn-accordion-body {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
        border-top-color: transparent;
        pointer-events: none;
      }

      /* Color Picker Component */
      .mn-color-picker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
        font-family: var(--mn_font);
        color: var(--mn_onSurface);
        font-size: 14px;
      }
      .mn-color-picker-label {
        font-weight: 500;
      }
      .mn-color-picker-control {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .mn-color-picker-dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid var(--mn_border);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.15s ease;
      }
      .mn-color-picker-dot:hover {
        transform: scale(1.1);
      }
      .mn-color-picker-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        width: 0;
        height: 0;
      }
      .mn-color-picker-value {
        font-family: monospace;
        font-size: 13px;
        color: var(--mn_onSurface);
        opacity: 0.8;
        text-transform: uppercase;
      }

      /* MNImage */
      .mn-image-container { position: relative; display: inline-block; width: 100%; border-radius: var(--mn_radius); overflow: hidden; background: rgba(0,0,0,0.05); }
      .mn-image { display: block; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s; }
      .mn-image.mn-loaded { opacity: 1; }
      .mn-image-error { display: flex; align-items: center; justify-content: center; background: var(--mn_surface); color: var(--mn_error); font-family: var(--mn_font); font-size: 13px; padding: 20px; text-align: center; }
      .mn-skeleton { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.15) 37%, rgba(0,0,0,0.06) 63%); background-size: 400% 100%; animation: mn-skeleton-loading 1.4s ease infinite; }
      @keyframes mn-skeleton-loading { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }

      /* MNTabs */
      .mn-tabs-container { display: flex; flex-direction: column; width: 100%; font-family: var(--mn_font); }
      .mn-tabs-header { display: flex; border-bottom: 2px solid var(--mn_border); gap: 16px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none; }
      .mn-tabs-header::-webkit-scrollbar { display: none; }
      .mn-tab-btn { background: transparent; border: none; padding: 8px 4px; font-size: 14px; font-weight: 600; color: var(--mn_onSurface); opacity: 0.6; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; white-space: nowrap; }
      .mn-tab-btn:hover { opacity: 1; }
      .mn-tab-btn.mn-active { opacity: 1; color: var(--mn_primary); border-bottom-color: var(--mn_primary); }
      .mn-tab-pane { display: none; flex-direction: column; gap: 12px; animation: mn-fade-in 0.3s ease; }
      .mn-tab-pane.mn-active { display: flex; }
      @keyframes mn-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

      /* MNTextArea */
      .mn-textarea { width: 100%; padding: 10px 12px; border: 1.5px solid var(--mn_border); border-radius: var(--mn_radius); background: var(--mn_background); color: var(--mn_onSurface); font-family: var(--mn_font); font-size: 14px; resize: none; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
      .mn-textarea:focus { outline: none; border-color: var(--mn_primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); background: var(--mn_surface_solid); }
      
      /* MNProgressBar */
      .mn-progress-container { display: flex; align-items: center; gap: 12px; width: 100%; font-family: var(--mn_font); }
      .mn-progress-bar { flex: 1; height: 8px; background: var(--mn_border); border-radius: 4px; overflow: hidden; }
      .mn-progress-fill { height: 100%; background: var(--mn_primary); border-radius: 4px; transition: width 0.3s ease; }
      .mn-progress-label { font-size: 13px; font-weight: 600; color: var(--mn_onSurface); min-width: 40px; text-align: right; }

      /* MNSpinner */
      .mn-spinner { border: 3px solid var(--mn_border); border-radius: 50%; border-top-color: var(--mn_primary); animation: mn-spin 1s linear infinite; }
      @keyframes mn-spin { to { transform: rotate(360deg); } }

      /* MNTooltip */
      .mn-tooltip-wrapper { position: relative; display: inline-block; }
      .mn-tooltip { position: absolute; background: var(--mn_onSurface); color: var(--mn_background); padding: 6px 10px; font-size: 12px; font-weight: 500; font-family: var(--mn_font); border-radius: 6px; white-space: nowrap; pointer-events: none; opacity: 0; transform: scale(0.95); transition: all 0.2s; z-index: 100; box-shadow: var(--mn_shadow); }
      .mn-tooltip-wrapper:hover > .mn-tooltip { opacity: 1; transform: scale(1); }
      .mn-tooltip.top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) scale(0.95); }
      .mn-tooltip.bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%) scale(0.95); }
      .mn-tooltip.left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%) scale(0.95); }
      .mn-tooltip.right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%) scale(0.95); }
      .mn-tooltip-wrapper:hover > .mn-tooltip.top, .mn-tooltip-wrapper:hover > .mn-tooltip.bottom { transform: translateX(-50%) scale(1); }
      .mn-tooltip-wrapper:hover > .mn-tooltip.left, .mn-tooltip-wrapper:hover > .mn-tooltip.right { transform: translateY(-50%) scale(1); }

      /* MNRadioGroup */
      .mn-radio-group { display: flex; flex-direction: column; gap: 10px; width: 100%; font-family: var(--mn_font); }
      .mn-radio-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; color: var(--mn_onSurface); font-weight: 500; user-select: none; position: relative; }
      .mn-radio-input { position: absolute; opacity: 0; width: 0; height: 0; }
      .mn-radio-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--mn_border); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      .mn-radio-dot::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--mn_primary); transform: scale(0); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .mn-radio-input:checked ~ .mn-radio-dot { border-color: var(--mn_primary); }
      .mn-radio-input:checked ~ .mn-radio-dot::after { transform: scale(1); }

      /* MNTable */
      .mn-table-wrapper { width: 100%; overflow-x: auto; border-radius: var(--mn_radius); border: 1px solid var(--mn_border); background: var(--mn_surface); }
      .mn-table { width: 100%; border-collapse: collapse; text-align: left; font-family: var(--mn_font); font-size: 13px; color: var(--mn_onSurface); }
      .mn-table th { padding: 12px 16px; font-weight: 600; border-bottom: 1px solid var(--mn_border); background: rgba(0,0,0,0.02); white-space: nowrap; }
      .mn-table td { padding: 10px 16px; border-bottom: 1px solid var(--mn_border); }
      .mn-table tr:last-child td { border-bottom: none; }
      .mn-table tr:hover td { background: rgba(0,0,0,0.02); }

      /* MNDialog */
      .mn-dialog-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
      .mn-dialog-overlay.mn-show { opacity: 1; pointer-events: auto; }
      .mn-dialog { background: var(--mn_surface_solid); border: 1px solid var(--mn_border); border-radius: var(--mn_radius); padding: 20px; width: 90%; max-width: 320px; box-shadow: var(--mn_shadow); transform: scale(0.95); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; gap: 12px; font-family: var(--mn_font); }
      .mn-dialog-overlay.mn-show .mn-dialog { transform: scale(1); }
      .mn-dialog-title { margin: 0; font-size: 16px; font-weight: 700; color: var(--mn_onSurface); }
      .mn-dialog-message { margin: 0; font-size: 14px; color: var(--mn_onSurface); opacity: 0.9; line-height: 1.5; }
      .mn-dialog-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
    `;

    const style = document.createElement("style");
    style.textContent = css;
    getShadowRoot().append(style);
  }

  setMode(mode) {
    this.mode = mode;
    StatePersistence.set("mngui_theme_mode", mode);
    this.applyVariables();
  }

  toggleMode() {
    if (this.mode === "auto") {
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setMode(isSystemDark ? "light" : "dark");
    } else {
      this.setMode(this.mode === "dark" ? "light" : "dark");
    }
  }

  applyVariables() {
    const variablesCss = `
      :host {
        --mn_primary: ${this.primary};
        --mn_primaryVariant: ${this.primaryVariant};
        --mn_secondary: ${this.secondary};
        --mn_secondaryVariant: ${this.secondaryVariant};
        --mn_background: ${this.background};
        --mn_surface: ${this.surface};
        --mn_surface_solid: #ffffff;
        --mn_error: ${this.error};
        --mn_onPrimary: ${this.onPrimary};
        --mn_onSecondary: ${this.onSecondary};
        --mn_onBackground: ${this.onBackground};
        --mn_onSurface: ${this.onSurface};
        --mn_onError: ${this.onError};
        --mn_border: rgba(0, 0, 0, 0.08);
        --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        --mn_radius: 12px;
        --mn_font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }

      /* Slate Dark Mode - Auto */
      @media (prefers-color-scheme: dark) {
        :host(:not([data-theme="light"])) {
          --mn_background: #0f172a;
          --mn_surface: rgba(30, 41, 59, 0.85);
          --mn_surface_solid: #1e293b;
          --mn_border: rgba(255, 255, 255, 0.1);
          --mn_onBackground: #f8fafc;
          --mn_onSurface: #f8fafc;
          --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
        }
      }

      /* Slate Dark Mode - Explicit */
      :host([data-theme="dark"]) {
        --mn_background: #0f172a;
        --mn_surface: rgba(30, 41, 59, 0.85);
        --mn_surface_solid: #1e293b;
        --mn_border: rgba(255, 255, 255, 0.1);
        --mn_onBackground: #f8fafc;
        --mn_onSurface: #f8fafc;
        --mn_shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
      }
    `;

    const hostElement = document.getElementById("mngui-root-container");
    if (hostElement) {
      if (this.mode === "auto") {
        hostElement.removeAttribute("data-theme");
      } else {
        hostElement.setAttribute("data-theme", this.mode);
      }
    }

    let varStyle = getShadowRoot().querySelector("#mngui-theme-variables");
    if (!varStyle) {
      varStyle = document.createElement("style");
      varStyle.setAttribute("id", "mngui-theme-variables");
      getShadowRoot().append(varStyle);
    }
    varStyle.textContent = variablesCss;
  }
}
