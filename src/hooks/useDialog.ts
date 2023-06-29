import { ref } from "vue";

interface UseDialog {
  title?: string
}

export function useDialog(params: UseDialog) {
  const visible = ref<boolean>(false);
  const changeVisible = (status: boolean) => {
    visible.value = status;
  }

  const title = ref(params.title);
  const setDialogTitle = (newTitle: string) => {
    title.value = newTitle;
  };

  const handleClose = (callback: () => void) => {
    changeVisible(false);
    callback();
  }

  return {
    visible,
    changeVisible,
    title,
    setDialogTitle,
    handleClose
  }
}