export class StackNavigator {
  constructor (screens = [], initScreen = "") {
    this.stack = [screens.find(screen => screen.name === initScreen) || screens[0]];
    this.screenList = screens;
  }

  get currentScreen() {
    return ({
      ...this.stack[this.stack.length - 1],
      screenIndex: this.stack.length - 1,
    });
  }

  navigation(name) {
    const screen = this.screenList.find(screen => screen.name === name);
    if (!screen) return console.warn("Screen not found: " + name);

    const prevScreen = this.currentScreen;
    const screenIndex = this.stack.findIndex(screen => screen.name === name);

    if (screenIndex > -1) {
      // Back to previous screen in the stack
      prevScreen.component.hide("right", () => {
        for (let i = screenIndex + 1; i < this.stack.length; i++) {
          this.stack[i].component.destroy();
        }
        this.stack.splice(screenIndex + 1);
      });
      
      const targetScreen = this.stack[screenIndex];
      targetScreen.component.show("left");
    }
    else {
      // Go forward to a new screen
      prevScreen.component.hide("left");
      this.stack.push(screen);
      this.currentScreen.component.show("right");
    }
  }

  back() {
    if (this.stack.length <= 1) return console.warn("No screen to go back to");
    
    const prevScreen = this.currentScreen;
    prevScreen.component.hide("right", () => {
      prevScreen.component.destroy();
      this.stack.pop();
    });
    
    const targetScreen = this.stack[this.stack.length - 2];
    targetScreen.component.show("left");
  }
}
