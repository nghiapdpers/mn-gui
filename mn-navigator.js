class StackNavigator {
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
    if (!screen) return console.log("Screen not found");

    this.currentScreen.component.hide("left", () => {
      const screenIndex = this.stack.findIndex(screen => screen.name === name);
      if (screenIndex > -1) {
        for (let i = screenIndex + 1; i < this.stack.length; i++) {
          this.stack[i].component.destroy();
        }
        this.stack.splice(screenIndex + 1, 1);
        this.currentScreen.component.show("left");
      }
      else {
        this.stack.push(screen);
        this.currentScreen.component.show("right");
      }
    });
  }

  back() {
    if (this.stack.length <= 1) return console.log("No screen to back");
    this.currentScreen.component.hide("right", () => {
      this.currentScreen.component.destroy();
      this.stack.pop();
      this.currentScreen.component.show("left");
    });
  }
}

