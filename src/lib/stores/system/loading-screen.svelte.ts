function createLoadingScreenStore() {
  let obstructiveLoadingScreen: boolean = $state(false);

  return {
    get obstructiveLoadingScreen() {
      return obstructiveLoadingScreen;
    },
    updateObstructiveLoadingScreen: (value: boolean) => {
      obstructiveLoadingScreen = value;
    },
  };
}

export const useLoadingScreenStore = createLoadingScreenStore();
