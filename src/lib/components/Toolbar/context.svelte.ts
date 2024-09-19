export function createToolbarContextStore() {
  let isSearchActive: boolean = $state(false);

  return {
    get isSearchActive() {
      return isSearchActive;
    },
    updateSearchActiveState: (value: boolean) => {
      isSearchActive = value;
    },
  };
}
