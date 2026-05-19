# 💎 MNGUI v4.0.0 — Modern UI Kit for Userscripts

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue.svg)](mngui.d.ts)
[![Platform](https://img.shields.io/badge/Platform-Tampermonkey%20%7C%20Violentmonkey-orange.svg)](#)

**MNGUI** is a lightweight, zero-dependency, pure JavaScript UI library designed specifically to build beautiful, responsive, and professional control panels for **Userscripts** (e.g., Tampermonkey, Violentmonkey, Greasemonkey).

Utilizing an isolated **Shadow DOM** structure, MNGUI guarantees 100% style isolation from the host webpage's stylesheets, bringing a premium **Glassmorphism** & **Slate Dark Mode** interface to your scripts.

---

## ✨ Key Features & Core Concepts

*   🛡️ **Absolute Shadow DOM Isolation**: Your UI lives in an open Shadow Root, completely immune to host webpage CSS conflicts (and vice-versa).
*   🎨 **Sleek Slate Dark Mode**: Modern Slate/Graphite color tones combined with blur-glass backing (Glassmorphism) for an ultra-premium experience.
*   💾 **Auto-Save State (State Persistence)**: Automatically save and restore the state of input fields, switches, checkboxes, etc., using `GM_setValue`/`GM_getValue` (optimized for userscripts) or fallback to `localStorage` with a simple `.persist("key")` call.
*   🔄 **Reactive Data Binding (`MNState`)**: Simple two-way data binding to keep your variables and UI fully synchronized automatically.
*   🕹️ **Draggable Panel**: Users can drag the control panel anywhere on the screen so it doesn't obstruct critical page content.
*   ⚡ **Keyboard Shortcut toggle**: Instantly hide/show the control panel using the default shortcut `Alt + M` or click the compact minimize toggle.
*   💻 **TypeScript Auto-Complete**: Fully documented `mngui.d.ts` declaration file included for instant autocomplete and Intellisense in VS Code.

---

## 🚀 Quick Integration Guide

To integrate MNGUI into your Userscript, simply add the following to your script's metadata block:

```javascript
// ==UserScript==
// @name         Premium Automation Script
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Userscript powered by MNGUI control panel
// @author       You
// @match        https://example.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=example.com
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/gh/nghiapdpers/mn-gui@master/mngui.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 1. Initialize MNGUI main instance
    const gui = new MNGUI();

    // 2. Customize control panel title
    gui.popup.setTitle("⚙️ AUTOMATION CONTROL PANEL");
    
    // 3. Create a new Screen (MNScreen)
    const mainScreen = new MNScreen();
    
    // 4. Create Column layout
    const container = new MNColumn();
    
    // Add text label
    container.append(
        new MNText("System Settings").style("font-size: 16px; font-weight: 600; margin-bottom: 8px;")
    );
    container.append(new MNDivider());

    // Switch toggle with auto-save persistence
    const autoClickSwitch = new MNSwitch("Enable Auto Click", false)
        .persist("my_script_auto_click") // Automatically saves and restores state
        .onChange((enabled) => {
            MNToast.show(enabled ? "Auto Click Enabled!" : "Auto Click Disabled!", "info");
        });
    container.append(autoClickSwitch);

    // Numeric Slider with persistence
    const speedSlider = new MNSlider("Click Delay (seconds)", 0.5, 5.0, 1.0, 0.1)
        .persist("my_script_click_speed")
        .onChange((seconds) => {
            console.log("New delay:", seconds);
        });
    container.append(speedSlider);

    // Button trigger
    const runBtn = new MNButton("Start Routine")
        .onClick(() => {
            MNDialog.show({
                title: "Confirmation",
                message: "Are you sure you want to run the automation routine?",
                confirmText: "Yes, Start",
                cancelText: "Cancel",
                onConfirm: () => {
                    MNToast.show("Routine started successfully...", "success");
                }
            });
        });
    container.append(runBtn);

    // Attach container layout to Screen
    mainScreen.append(container);

    // 5. Initialize routing navigator
    const navigator = new StackNavigator([
        { name: "main", component: mainScreen }
    ], "main");

    // 6. Connect navigator and render UI
    gui.setNavigator(navigator);
    gui.render();
})();
```

---

## 🎨 Core Architecture

### 1. Style Isolation via Shadow DOM
MNGUI injects a `<div id="mngui-root-container">` directly into the document `body`, then attaches an `open` **Shadow Root**. All component DOM elements and CSS variables stylesheet are appended within this root.
This completely prevents external page stylesheets (like Bootstrap, Tailwind CSS, or default global rules) from bleeding into MNGUI, ensuring pixel-perfect layout consistency across all web domains.

### 2. State Persistence
Calling `.persist("storage_key")` on an interactive input element instructs the component to:
1. Fetch any previously stored value on initialization and assign it (silently, without firing double change events).
2. Attach listeners on value updates (`change` and `input` events) to automatically serialize and save updates.
3. Automatically prioritize Violentmonkey/Tampermonkey's secure cross-subdomain storage (`GM_setValue`/`GM_getValue`) before falling back to `localStorage`.

### 3. Reactive Data Binding with `MNState`
`MNState` is a simple observable wrapper:
```javascript
const appState = new MNState("Default value");

// Bind to an input field
const input = new MNInput("Type here...").bind(appState);

// Bind to a label
const label = new MNText().bind(appState);

// Mutating the state value directly instantly syncs both components
appState.value = "New text!"; 
```

---

## 📚 Detailed Component Documentation (API Reference)

API documentation files for MNGUI classes and components are organized below:

### ⚙️ Core Modules
| Class | Docs Link | Description |
| :--- | :--- | :--- |
| **`MNGUI`** | [👉 view docs/en/core/MNGUI.md](docs/en/core/MNGUI.md) | Central entry-point controller |
| **`Theme`** | [👉 view docs/en/core/Theme.md](docs/en/core/Theme.md) | Color styling variables and light/dark theme switcher |
| **`Popup`** | [👉 view docs/en/core/Popup.md](docs/en/core/Popup.md) | Draggable panel container, size, toggle button, and shortcuts |
| **`StackNavigator`** | [👉 view docs/en/core/StackNavigator.md](docs/en/core/StackNavigator.md) | Screen router history and slide-in transition controller |
| **`MNState`** | [👉 view docs/en/core/MNState.md](docs/en/core/MNState.md) | Reactive observables and data binding engine |

### 📦 UI Components

#### 📐 Layout & Grid Containers
*   [**`MNScreen`** - MNGUI Screen Base](docs/en/components/MNScreen.md)
*   [**`MNColumn`** - Vertical Flex Layout](docs/en/components/MNColumn.md)
*   [**`MNRow`** - Horizontal Flex Layout](docs/en/components/MNRow.md)
*   [**`MNDivider`** - Visual separating line](docs/en/components/MNDivider.md)
*   [**`MNTabs`** - Divided Tabs Layout](docs/en/components/MNTabs.md)

#### 📝 Typography & Static Components
*   [**`MNText`** - Standard text span](docs/en/components/MNText.md)
*   [**`MNBadge`** - Colored label tags](docs/en/components/MNBadge.md)
*   [**`MNImage`** - Image loader with Skeleton placeholders](docs/en/components/MNImage.md)

#### 🖲️ Buttons & Interactive Elements
*   [**`MNButton`** - Clickable button with Ripple feedback](docs/en/components/MNButton.md)
*   [**`MNSwitch`** - Toggle switch component](docs/en/components/MNSwitch.md)
*   [**`MNCheckbox`** - Traditional checkbox element](docs/en/components/MNCheckbox.md)
*   [**`MNRadioGroup`** - Exclusive radio button group](docs/en/components/MNRadioGroup.md)

#### ✏️ Form Fields & Controls
*   [**`MNInput`** - Single-line text input](docs/en/components/MNInput.md)
*   [**`MNTextArea`** - Auto-resizing multi-line text input](docs/en/components/MNTextArea.md)
*   [**`MNSlider`** - Range interval number selector](docs/en/components/MNSlider.md)
*   [**`MNSelect`** - Customized dropdown dropdown](docs/en/components/MNSelect.md)
*   [**`MNColorPicker`** - Visual HEX color picker](docs/en/components/MNColorPicker.md)

#### 🔔 Feedback & Overlays
*   [**`MNToast`** - Notification stack alerts](docs/en/components/MNToast.md)
*   [**`MNDialog`** - Confirmation modal dialogues](docs/en/components/MNDialog.md)
*   [**`MNProgressBar`** - Status graphical percentage bar](docs/en/components/MNProgressBar.md)
*   [**`MNSpinner`** - Round CSS loading spinner](docs/en/components/MNSpinner.md)
*   [**`MNTooltip`** - Hover explaining labels](docs/en/components/MNTooltip.md)

#### 📊 Advanced Data Structures
*   [**`MNAccordion`** - Smooth collapsible panels](docs/en/components/MNAccordion.md)
*   [**`MNTable`** - Structural tabular data grid](docs/en/components/MNTable.md)

---

## 🛠️ Development & Contributions

To modify or contribute to the library:

1.  **Clone repository:**
    ```bash
    git clone https://github.com/nghiapdpers/mn-gui.git
    cd mn-gui
    ```
2.  **Install development tools (bundler dependencies):**
    ```bash
    npm install
    ```
3.  **Start auto-bundling watch script:**
    ```bash
    npm run dev
    ```
4.  **Testing features:**
    Open `index.html` in your browser to interactively test all elements in a real sandbox.

---

## 📄 License

Distributed under the **MIT License**. Feel free to use, modify, and integrate in both commercial and private userscripts.
