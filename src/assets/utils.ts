import { ChangeEvent } from 'react';



export const onChangeAttachAnswerImageCreator = (setValue : (value: string) => void, target : HTMLInputElement ) => {
      const formData = new FormData();
      const imgFile = target.files && target.files[0];
      const reader = new FileReader();
      if (imgFile) {
        formData.append('imgFile', imgFile, imgFile.name);
        reader.onloadend = () => setValue(reader.result as string);
        reader.readAsDataURL(imgFile);
      }
    };