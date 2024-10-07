function createPhrasesDragStore() {
  let dragHandleActive: boolean = $state(false);

  return {
    get dragHandleActive() {
      return dragHandleActive;
    },
    updateDragHandleActive: (value: boolean) => {
      dragHandleActive = value;
    },
  };
}

export const usePhrasesDragStore = createPhrasesDragStore();
