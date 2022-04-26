export type Routes = {
  PreviewPage: undefined;
  CameraPage: undefined;
    MediaPage: {
      path: string;
      type: 'video' | 'photo';
    };
  };