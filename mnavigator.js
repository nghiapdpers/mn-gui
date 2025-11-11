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
    if (screen) {
      this.currentScreen.component.hide();
      const screenIndex = this.stack.findIndex(screen => screen.name === name);
      if (screenIndex > -1) {
        for (let i = screenIndex + 1; i < this.stack.length; i++) {
          this.stack[i].component.destroy();
        }
        this.stack.splice(screenIndex + 1, 1);
      }
      else {
        this.stack.push(screen);
      }
      screen.component.show();
    }
    else {
      console.log("Screen not found");
    }
  }

  back() {
    if (this.stack.length > 1) {
      this.currentScreen.component.hide();
      this.currentScreen.component.destroy();
      this.stack.pop();
      this.currentScreen.component.show();
    }
    else {
      console.log("No screen to back");
    }
  }
}

