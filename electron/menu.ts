import {BrowserWindow, Menu, MenuItemConstructorOptions, shell} from 'electron';
import hotkeys from '@constants/hotkeys';
import {updateStartupModalVisible} from '@redux/reducers/appConfig';
import {AppState} from '@models/appstate';
import {AppConfig} from '@models/appconfig';
import {ROOT_FILE_ENTRY} from '@constants/constants';

const isMac = process.platform === 'darwin';

const appMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  return {
    label: 'Monokle',
    submenu: [
      {
        label: 'About Monokle',
        click: async () => {
          await store.dispatch(updateStartupModalVisible(true));
        },
      },
      {
        label: 'Check for Update',
        click: () => {
          console.log('Check for update');
        },
      },
      {type: 'separator'},
      {label: 'Hide Monokle', role: 'hide'},
      {role: 'hideOthers'},
      {role: 'unhide'},
      {type: 'separator'},
      {label: 'Quit Monokle', role: 'quit'},
    ],
  };
};

const fileMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  const configState: AppConfig = store.getState().config;
  const mainState: AppState = store.getState().main;
  return {
    label: 'File',
    submenu: [
      {
        label: 'Browse Folder',
        click: async () => {
          console.log('Browse folder');
        },
      },
      {
        label: 'Refresh Folder',
        enabled: Boolean(mainState.fileMap[ROOT_FILE_ENTRY]),
        click: async () => {
          const {setRootFolder} = await import('@redux/thunks/setRootFolder'); // Temporary fix until refactor
          store.dispatch(setRootFolder(mainState.fileMap[ROOT_FILE_ENTRY].filePath));
        },
      },
      {type: 'separator'},
      {
        label: 'Recent Folders',
        submenu: configState.recentFolders.map((folder: string) => ({
          label: folder,
          click: async () => {
            const {setRootFolder} = await import('@redux/thunks/setRootFolder'); // Temporary fix until refactor
            store.dispatch(setRootFolder(folder));
          },
        })),
      },
      {type: 'separator'},
      {
        label: 'New Resource',
        click: async () => {
          console.log('Refresh folder');
        },
      },
      {type: 'separator'},
      {label: 'Exit Preview'},
    ],
  };
};

const editMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  return {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {type: 'separator'},
      {label: 'Find'},
      {label: 'Replace'},
      {type: 'separator'},
      {label: 'Apply'},
      {label: 'Diff'},
    ],
  };
};

const viewMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  let mainState: AppState = store.getState().main;
  const isPreviousResourceEnabled = mainState.selectionHistory.length > 0;
  const isNextResourceEnabled = mainState.currentSelectionHistoryIndex
    ? mainState.currentSelectionHistoryIndex < mainState.selectionHistory.length - 1
    : false;
  return {
    label: 'View',
    submenu: [
      {
        label: 'Previous Resource',
        accelerator: hotkeys.SELECT_FROM_HISTORY_BACK,
        enabled: isPreviousResourceEnabled,
        click: async () => {
          const {selectFromHistory} = await import('@redux/thunks/selectionHistory'); // Temporary fix until refactor
          store.dispatch(selectFromHistory({direction: 'left'}));
        },
      },
      {
        label: 'Next Resource',
        accelerator: hotkeys.SELECT_FROM_HISTORY_FORWARD,
        enabled: isNextResourceEnabled,
        click: async () => {
          const {selectFromHistory} = await import('@redux/thunks/selectionHistory'); // Temporary fix until refactor
          store.dispatch(selectFromHistory({direction: 'right'}));
        },
      },
      {type: 'separator'},
      {label: 'Toggle Navigator'},
      {type: 'separator'},
    ],
  };
};

const windowMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  return {
    label: 'Window',
    submenu: [
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'},
      {type: 'separator'},
      {role: 'window'},
    ],
  };
};

const helpMenu = (win: BrowserWindow, store: any): MenuItemConstructorOptions => {
  return {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click: async () => {
          await shell.openExternal('https://kubeshop.github.io/monokle/');
        },
      },
      {type: 'separator'},
      {
        label: 'Github',
        click: async () => {
          await shell.openExternal('https://github.com/kubeshop/monokle');
        },
      },
    ],
  };
};

export const createMenu = (win: BrowserWindow, store: any) => {
  const template: any[] = [
    fileMenu(win, store),
    editMenu(win, store),
    viewMenu(win, store),
    windowMenu(win, store),
    helpMenu(win, store),
  ];

  if (isMac) {
    template.unshift(appMenu(win, store));
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
