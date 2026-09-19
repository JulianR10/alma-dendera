export function initSessionDialogs(): void {
  const openers = document.querySelectorAll<HTMLButtonElement>('[data-dialog-open]');
  if (openers.length === 0) return;

  let lastOpener: HTMLButtonElement | null = null;

  const lockScroll = (): void => {
    window.__almaLenis?.stop();
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = (): void => {
    document.body.style.overflow = '';
    window.__almaLenis?.start();
  };

  const openDialog = (dialog: HTMLDialogElement, opener: HTMLButtonElement): void => {
    lastOpener = opener;
    if (dialog.open) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    lockScroll();
    const scroller = dialog.querySelector<HTMLElement>('.session-dialog__inner');
    if (scroller) scroller.scrollTop = 0;
    const closer = dialog.querySelector<HTMLElement>('[data-dialog-close]');
    if (closer) closer.focus({ preventScroll: true });
  };

  const closeDialog = (dialog: HTMLDialogElement): void => {
    if (!dialog.open && !dialog.hasAttribute('open')) return;
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  };

  openers.forEach((opener) => {
    opener.addEventListener('click', () => {
      const targetId = opener.getAttribute('data-dialog-open');
      if (!targetId) return;
      const dialog = document.getElementById(targetId);
      if (!(dialog instanceof HTMLDialogElement)) return;
      openDialog(dialog, opener);
    });
  });

  const dialogs = document.querySelectorAll<HTMLDialogElement>('.session-dialog');
  dialogs.forEach((dialog) => {
    dialog.querySelectorAll<HTMLElement>('[data-dialog-close]').forEach((closer) => {
      closer.addEventListener('click', () => closeDialog(dialog));
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      unlockScroll();
      lastOpener?.focus();
      lastOpener = null;
    });
  });
}
