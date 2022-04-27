export type Routes = {
  PreviewPage: undefined;
  CameraPage: undefined;
  LibraryPage: undefined;
  InfoPage: undefined;
    MediaPage: {
      path: string;
      type: 'video' | 'photo';
    };
  };